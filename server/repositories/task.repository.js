const db = require('../database/db');

async function create(missionId, data) {
    const query = `
        INSERT INTO mission_tasks (mission_id, assignee_id, task_type, priority, instructions, destination_latitude, destination_longitude, status, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, 'Pending', CURRENT_TIMESTAMP)
        RETURNING id AS task_id, mission_id, assignee_id AS responder_id, task_type, priority, instructions, destination_latitude, destination_longitude, status, created_at AS assigned_time;
    `;
    const values = [missionId, data.responder_id, data.task_type, data.priority || 'Normal', data.instructions || '', data.destination_latitude, data.destination_longitude];
    const { rows } = await db.query(query, values);
    return rows[0];
}

async function getById(id) {
    const query = 'SELECT id AS task_id, mission_id, assignee_id AS responder_id, task_type, priority, instructions, destination_latitude, destination_longitude, status, created_at AS assigned_time, started_at AS started_time, completed_at AS completed_time FROM mission_tasks WHERE id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

async function getByMissionId(missionId) {
    const query = 'SELECT id AS task_id, mission_id, assignee_id AS responder_id, task_type, priority, instructions, destination_latitude, destination_longitude, status, created_at AS assigned_time, started_at AS started_time, completed_at AS completed_time FROM mission_tasks WHERE mission_id = $1;';
    const { rows } = await db.query(query, [missionId]);
    return rows;
}

async function update(id, data) {
    const query = `
        UPDATE mission_tasks 
        SET priority = COALESCE($1, priority), 
            instructions = COALESCE($2, instructions), 
            status = COALESCE($3, status) 
        WHERE id = $4
        RETURNING id AS task_id, mission_id, assignee_id AS responder_id, task_type, priority, instructions, destination_latitude, destination_longitude, status, created_at AS assigned_time;
    `;
    const { rows } = await db.query(query, [data.priority, data.instructions, data.status, id]);
    return rows[0] || null;
}

async function startTask(id) {
    const { rows } = await db.query("UPDATE mission_tasks SET status = 'In Progress', started_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id AS task_id, status, started_at AS started_time;", [id]);
    return rows[0] || null;
}

async function completeTask(id) {
    const { rows } = await db.query("UPDATE mission_tasks SET status = 'Completed', completed_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id AS task_id, status, completed_at AS completed_time;", [id]);
    return rows[0] || null;
}

async function deleteById(id) {
    const { rowCount } = await db.query('DELETE FROM mission_tasks WHERE id = $1;', [id]);
    return rowCount > 0;
}

module.exports = { create, getById, getByMissionId, update, startTask, completeTask, delete: deleteById };
