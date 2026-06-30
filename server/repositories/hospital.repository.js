/**
 * KAVACH - Hospital Repository (Safe Database Layer)
 * Directly interacts with Neon PostgreSQL utilizing the exact production table schema:
 * - id, name, latitude, longitude, capacity, has_trauma_center, contact_number
 */

const db = require('../database/db');

/**
 * Creates a new hospital facility record in the database.
 * @param {Object} data - Hospital configuration parameters.
 * @returns {Promise<Object>}
 */
async function create(data) {
    const query = `
        INSERT INTO hospitals (name, latitude, longitude, capacity, has_trauma_center, contact_number)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, name, latitude, longitude, capacity, has_trauma_center, contact_number AS phone;
    `;
    const { rows } = await db.query(query, [
        data.name,
        data.latitude,
        data.longitude,
        data.capacity,
        data.has_trauma_center,
        data.phone
    ]);
    return rows[0];
}

/**
 * Retrieves all registered hospitals sorted alphabetically by name.
 * @returns {Promise<Array>}
 */
async function getAll() {
    const query = `
        SELECT id, name, latitude, longitude, capacity, has_trauma_center, contact_number AS phone 
        FROM hospitals 
        ORDER BY name ASC;
    `;
    const { rows } = await db.query(query);
    return rows;
}

/**
 * Retrieves a single hospital by its primary UUID.
 * @param {string} id - Hospital UUID.
 * @returns {Promise<Object|null>}
 */
async function getById(id) {
    const query = `
        SELECT id, name, latitude, longitude, capacity, has_trauma_center, contact_number AS phone 
        FROM hospitals 
        WHERE id = $1;
    `;
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

/**
 * Dynamically modifies parameters of a hospital record.
 * @param {string} id - Hospital UUID.
 * @param {Object} data - Fields to update.
 * @returns {Promise<Object|null>}
 */
async function update(id, data) {
    const query = `
        UPDATE hospitals 
        SET name = COALESCE($1, name), 
            latitude = COALESCE($2, latitude), 
            longitude = COALESCE($3, longitude), 
            capacity = COALESCE($4, capacity), 
            has_trauma_center = COALESCE($5, has_trauma_center), 
            contact_number = COALESCE($6, contact_number)
        WHERE id = $7
        RETURNING id, name, latitude, longitude, capacity, has_trauma_center, contact_number AS phone;
    `;
    const { rows } = await db.query(query, [
        data.name,
        data.latitude,
        data.longitude,
        data.capacity,
        data.has_trauma_center,
        data.phone,
        id
    ]);
    return rows[0] || null;
}

/**
 * Deletes a hospital record from storage.
 * @param {string} id - Hospital UUID.
 * @returns {Promise<boolean>}
 */
async function deleteById(id) {
    const { rowCount } = await db.query('DELETE FROM hospitals WHERE id = $1;', [id]);
    return rowCount > 0;
}

/**
 * Performs Haversine distance computations inside PostgreSQL to find nearby hospitals.
 * @param {number} lat - Latitude.
 * @param {number} lng - Longitude.
 * @param {number} radius - Search radius in meters.
 * @returns {Promise<Array>}
 */
async function getNearby(lat, lng, radius) {
    const query = `
        SELECT id, name, latitude, longitude, capacity, has_trauma_center, contact_number AS phone,
               (6371000 * acos(least(1.0, greatest(-1.0, sin(radians($1)) * sin(radians(latitude)) + cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)))))) AS distance
        FROM hospitals
        WHERE (6371000 * acos(least(1.0, greatest(-1.0, sin(radians($1)) * sin(radians(latitude)) + cos(radians($1)) * cos(radians(latitude)) * cos(radians(longitude) - radians($2)))))) <= $3
        ORDER BY distance ASC;
    `;
    const { rows } = await db.query(query, [lat, lng, radius]);
    return rows;
}

module.exports = { create, getAll, getById, update, delete: deleteById, getNearby };
