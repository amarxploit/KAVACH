const db = require('../database/db');

async function create(data) {
    const client = await db.pool.connect();
    try {
        await client.query('BEGIN');
        const userQuery = `
            INSERT INTO users (role, full_name, phone, password_hash)
            VALUES ('responder', $1, $2, $3)
            RETURNING id;
        `;
        const userRes = await client.query(userQuery, [data.name, data.responder_code, '$2b$10$placeholder']);
        const userId = userRes.rows[0].id;

        const respQuery = `
            INSERT INTO verified_responders (user_id, responder_type, skills, verification_level, is_available)
            VALUES ($1, $2, $3, 'Level 1', TRUE)
            RETURNING id;
        `;
        const respRes = await client.query(respQuery, [userId, data.profession, data.specialization || []]);

        const gpsQuery = 'INSERT INTO gps_locations (user_id, latitude, longitude) VALUES ($1, $2, $3);';
        await client.query(gpsQuery, [userId, data.latitude, data.longitude]);

        await client.query('COMMIT');
        return { id: respRes.rows[0].id, name: data.name, responder_code: data.responder_code, profession: data.profession };
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
}

async function getAll() {
    const query = `
        SELECT vr.id, u.full_name AS name, vr.responder_type AS profession, u.phone AS responder_code, vr.is_available AS availability, gl.latitude, gl.longitude
        FROM verified_responders vr
        JOIN users u ON vr.user_id = u.id
        LEFT JOIN gps_locations gl ON gl.user_id = u.id;
    `;
    const { rows } = await db.query(query);
    return rows;
}

async function getById(id) {
    const query = `
        SELECT vr.id, u.full_name AS name, vr.responder_type AS profession, u.phone AS responder_code, vr.is_available AS availability, gl.latitude, gl.longitude
        FROM verified_responders vr
        JOIN users u ON vr.user_id = u.id
        LEFT JOIN gps_locations gl ON gl.user_id = u.id
        WHERE vr.id = $1;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

async function update(id, data) {
    const query = `
        UPDATE verified_responders 
        SET responder_type = COALESCE($1, responder_type), 
            is_available = COALESCE($2, is_available) 
        WHERE id = $3
        RETURNING id, responder_type, is_available;
    `;
    const { rows } = await db.query(query, [data.profession, data.availability, id]);
    return rows[0] || null;
}

async function deleteById(id) {
    const { rows } = await db.query('SELECT user_id FROM verified_responders WHERE id = $1;', [id]);
    if (rows.length === 0) return false;
    await db.query('DELETE FROM users WHERE id = $1;', [rows[0].user_id]);
    return true;
}

async function getNearby(lat, lng, radius) {
    const query = `
        SELECT vr.id, u.full_name AS name, vr.responder_type AS profession, u.phone AS responder_code, vr.is_available AS availability, gl.latitude, gl.longitude,
               (6371000 * acos(least(1.0, greatest(-1.0, sin(radians($1)) * sin(radians(gl.latitude)) + cos(radians($1)) * cos(radians(gl.latitude)) * cos(radians(gl.longitude) - radians($2)))))) AS distance
        FROM verified_responders vr
        JOIN users u ON vr.user_id = u.id
        JOIN gps_locations gl ON gl.user_id = u.id
        WHERE vr.is_available = TRUE 
          AND (6371000 * acos(least(1.0, greatest(-1.0, sin(radians($1)) * sin(radians(gl.latitude)) + cos(radians($1)) * cos(radians(gl.latitude)) * cos(radians(gl.longitude) - radians($2)))))) <= $3
        ORDER BY distance ASC;
    `;
    const { rows } = await db.query(query, [lat, lng, radius]);
    return rows;
}

module.exports = { create, getAll, getById, update, delete: deleteById, getNearby };
