const db = require('../database/db');

async function create(missionId, data) {
    const query = `
        INSERT INTO mission_timeline (mission_id, event_type, title, description, generated_by, user_id, task_id, created_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
        RETURNING id AS timeline_id, mission_id, event_type, title, description, generated_by, created_at AS generated_time, user_id AS related_user_id, task_id AS related_task_id;
    `;
    const values = [missionId, data.event_type, data.title, data.description, data.generated_by || 'System', data.user_id || null, data.task_id || null];
    const { rows } = await db.query(query, values);
    return rows[0];
}

async function getByMissionId(missionId) {
    const query = 'SELECT id AS timeline_id, mission_id, event_type, title, description, generated_by, created_at AS generated_time, user_id AS related_user_id, task_id AS related_task_id FROM mission_timeline WHERE mission_id = $1 ORDER BY created_at ASC;';
    const { rows } = await db.query(query, [missionId]);
    return rows;
}

async function deleteById(id) {
    const { rowCount } = await db.query('DELETE FROM mission_timeline WHERE id = $1;', [id]);
    return rowCount > 0;
}

module.exports = { create, getByMissionId, delete: deleteById };
