const db = require('../database/db');

async function create(data) {
    const query = `
        INSERT INTO missions (incident_id, officer_id, status, recruitment_open)
        VALUES ($1, $2, 'Planning', TRUE)
        RETURNING id AS mission_id, incident_id, officer_id, status AS mission_status, started_at AS created_time;
    `;
    const { rows } = await db.query(query, [data.incident_id, data.officer_id]);
    return rows[0];
}

async function getAll() {
    const query = 'SELECT id AS mission_id, incident_id, officer_id, status AS mission_status, started_at AS created_time FROM missions ORDER BY started_at DESC;';
    const { rows } = await db.query(query);
    return rows;
}

async function getById(id) {
    const query = 'SELECT id AS mission_id, incident_id, officer_id, status AS mission_status, started_at AS created_time FROM missions WHERE id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

async function update(id, data) {
    const query = `
        UPDATE missions 
        SET status = COALESCE($1, status), 
            recruitment_open = COALESCE($2, recruitment_open) 
        WHERE id = $3
        RETURNING id AS mission_id, incident_id, officer_id, status AS mission_status, started_at AS created_time;
    `;
    const { rows } = await db.query(query, [data.status, data.recruitment_open, id]);
    return rows[0] || null;
}

async function startMission(id) {
    const { rows } = await db.query("UPDATE missions SET status = 'Active', started_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id AS mission_id, incident_id, officer_id, status AS mission_status, started_at AS started_time;", [id]);
    return rows[0] || null;
}

async function completeMission(id) {
    const { rows } = await db.query("UPDATE missions SET status = 'Completed', ended_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id AS mission_id, incident_id, officer_id, status AS mission_status, ended_at AS completed_time;", [id]);
    return rows[0] || null;
}

async function deleteById(id) {
    const { rowCount } = await db.query('DELETE FROM missions WHERE id = $1;', [id]);
    return rowCount > 0;
}

module.exports = { create, getAll, getById, update, startMission, completeMission, delete: deleteById };
