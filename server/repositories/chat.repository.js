const db = require('../database/db');

async function create(missionId, data) {
    const query = `
        INSERT INTO mission_chat (mission_id, sender_id, receiver_id, message_type, message, created_at)
        VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
        RETURNING id AS message_id, mission_id, sender_id AS sender_user_id, receiver_id AS receiver_user_id, message_type, message, created_at AS timestamp, is_edited AS edited, is_deleted AS deleted;
    `;
    const { rows } = await db.query(query, [missionId, data.sender_id, data.receiver_id || null, data.message_type || 'Text', data.message]);
    return rows[0];
}

async function getById(id) {
    const query = 'SELECT id AS message_id, mission_id, sender_id AS sender_user_id, receiver_id AS receiver_user_id, message_type, message, created_at AS timestamp, is_edited AS edited, is_deleted AS deleted FROM mission_chat WHERE id = $1;';
    const { rows } = await db.query(query, [id]);
    return rows[0] || null;
}

async function getByMissionId(missionId) {
    const query = 'SELECT id AS message_id, mission_id, sender_id AS sender_user_id, receiver_id AS receiver_user_id, message_type, message, created_at AS timestamp, is_edited AS edited, is_deleted AS deleted FROM mission_chat WHERE mission_id = $1 ORDER BY created_at ASC;';
    const { rows } = await db.query(query, [missionId]);
    return rows;
}

async function softDelete(id) {
    const { rows } = await db.query('UPDATE mission_chat SET is_deleted = TRUE, message = \'[This message has been deleted]\', is_edited = TRUE WHERE id = $1 RETURNING id AS message_id, is_deleted AS deleted;', [id]);
    return rows[0] || null;
}

module.exports = { create, getById, getByMissionId, softDelete };
