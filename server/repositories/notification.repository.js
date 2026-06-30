const db = require('../database/db');

async function create(data) {
    const query = `
        INSERT INTO notifications (user_id, title, message, notification_type, is_read, mission_id, task_id, created_at)
        VALUES ($1, $2, $3, $4, FALSE, $5, $6, CURRENT_TIMESTAMP)
        RETURNING id, user_id AS recipient_user_id, mission_id, task_id, notification_type AS type, title, message, is_read AS read_status, created_at AS created_time;
    `;
    const { rows } = await db.query(query, [data.user_id, data.title, data.message, data.type, data.mission_id || null, data.task_id || null]);
    return rows[0];
}

async function getAll() {
    const query = 'SELECT id, user_id AS recipient_user_id, mission_id, task_id, notification_type AS type, title, message, is_read AS read_status, created_at AS created_time FROM notifications ORDER BY created_at DESC;';
    const { rows } = await db.query(query);
    return rows;
}

async function getById(id) {
    const query = 'SELECT id, user_id AS recipient_user_id, mission_id, task_id, notification_type AS type, title, message, is_read AS read_status, created_at AS created_time FROM notifications WHERE id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

async function getByUserId(userId) {
    const query = 'SELECT id, user_id AS recipient_user_id, mission_id, task_id, notification_type AS type, title, message, is_read AS read_status, created_at AS created_time FROM notifications WHERE user_id = $1 ORDER BY created_at DESC;';
    const { rows } = await db.query(query, [userId]);
    return rows;
}

async function markAsRead(id) {
    const { rows } = await db.query('UPDATE notifications SET is_read = TRUE WHERE id = $1 RETURNING id, is_read AS read_status;', [id]);
    return rows[0] || null;
}

async function deleteById(id) {
    const { rowCount } = await db.query('DELETE FROM notifications WHERE id = $1;', [id]);
    return rowCount > 0;
}

module.exports = { create, getAll, getById, getByUserId, markAsRead, delete: deleteById };
