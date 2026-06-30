const db = require('../database/db');

async function create(data) {
    const query = `
        INSERT INTO hospitals (name, latitude, longitude, capacity, has_trauma_center, contact_number, is_open, emergency_available)
        VALUES ($1, $2, $3, $4, $5, $6, TRUE, TRUE)
        RETURNING id, name, latitude, longitude, capacity, has_trauma_center, contact_number AS phone, is_open, emergency_available;
    `;
    const { rows } = await db.query(query, [data.name, data.latitude, data.longitude, data.capacity, data.has_trauma_center, data.phone]);
    return rows[0];
}

async function getAll() {
    const query = 'SELECT id, name, latitude, longitude, capacity, has_trauma_center, contact_number AS phone, is_open, emergency_available FROM hospitals ORDER BY name ASC;';
    const { rows } = await db.query(query);
    return rows;
}

async function getById(id) {
    const query = 'SELECT id, name, latitude, longitude, capacity, has_trauma_center, contact_number AS phone, is_open, emergency_available FROM hospitals WHERE id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

async function update(id, data) {
    const query = `
        UPDATE hospitals 
        SET name = COALESCE($1, name), 
            latitude = COALESCE($2, latitude), 
            longitude = COALESCE($3, longitude), 
            capacity = COALESCE($4, capacity), 
            has_trauma_center = COALESCE($5, has_trauma_center), 
            contact_number = COALESCE($6, contact_number), 
            is_open = COALESCE($7, is_open), 
            emergency_available = COALESCE($8, emergency_available) 
        WHERE id = $9
        RETURNING id, name, latitude, longitude, capacity, has_trauma_center, contact_number AS phone, is_open, emergency_available;
    `;
    const { rows } = await db.query(query, [data.name, data.latitude, data.longitude, data.capacity, data.has_trauma_center, data.phone, data.is_open, data.emergency_available, id]);
    return rows[0] || null;
}

async function deleteById(id) {
    const { rowCount } = await db.query('DELETE FROM hospitals WHERE id = $1;', [id]);
    return rowCount > 0;
}

async function getNearby(lat, lng, radius) {
    const query = `
        SELECT id, name, latitude, longitude, capacity, has_trauma_center, contact_number AS phone, is_open, emergency_available,
               (6371000 * acos(least(1.0, greatest(-1.0, sin(radians($1)) * sin(radians(latitude)) + cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)))))) AS distance
        FROM hospitals
        WHERE is_open = TRUE 
          AND (6371000 * acos(least(1.0, greatest(-1.0, sin(radians($1)) * sin(radians(latitude)) + cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)))))) <= $3
        ORDER BY distance ASC;
    `;
    const { rows } = await db.query(query, [lat, lng, radius]);
    return rows;
}

module.exports = { create, getAll, getById, update, delete: deleteById, getNearby };
