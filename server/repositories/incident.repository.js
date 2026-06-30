const db = require('../database/db');

async function create(data) {
    const query = `
        INSERT INTO incidents (reporter_id, incident_type, description, latitude, longitude, status)
        VALUES ($1, $2, $3, $4, $5, 'Reported')
        RETURNING id, reporter_id, incident_type, description, latitude, longitude, status, created_at;
    `;
    const values = [data.reporter_id || null, data.category, `[Priority: ${data.priority}] ${data.description || ''}`, data.latitude, data.longitude];
    const { rows } = await db.query(query, values);
    return rows[0];
}

async function getAll() {
    const query = 'SELECT id, reporter_id, incident_type, description, latitude, longitude, status, created_at FROM incidents ORDER BY created_at DESC;';
    const { rows } = await db.query(query);
    return rows;
}

async function getById(id) {
    const query = 'SELECT id, reporter_id, incident_type, description, latitude, longitude, status, created_at FROM incidents WHERE id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

async function update(id, data) {
    const query = `
        UPDATE incidents 
        SET incident_type = COALESCE($1, incident_type), 
            description = COALESCE($2, description), 
            latitude = COALESCE($3, latitude), 
            longitude = COALESCE($4, longitude), 
            status = COALESCE($5, status) 
        WHERE id = $6
        RETURNING id, reporter_id, incident_type, description, latitude, longitude, status, created_at;
    `;
    const { rows } = await db.query(query, [data.category, data.description, data.latitude, data.longitude, data.status, id]);
    return rows[0] || null;
}

async function deleteById(id) {
    const { rowCount } = await db.query('DELETE FROM incidents WHERE id = $1;', [id]);
    return rowCount > 0;
}

module.exports = { create, getAll, getById, update, delete: deleteById };
