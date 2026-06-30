const db = require('../database/db');

async function invite(missionId, responderId) {
    const query = `
        INSERT INTO mission_members (mission_id, responder_id, status, joined_at)
        VALUES ($1, $2, 'Invited', CURRENT_TIMESTAMP)
        RETURNING mission_id, responder_id, status AS current_status, joined_at AS joined_time;
    `;
    const { rows } = await db.query(query, [missionId, responderId]);
    return rows[0];
}

async function getMembers(missionId) {
    const query = `
        SELECT mm.mission_id, mm.responder_id AS responder_id, u.phone AS responder_code, u.full_name AS responder_name, vr.responder_type AS profession, mm.status AS current_status, mm.joined_at AS joined_time
        FROM mission_members mm
        JOIN verified_responders vr ON mm.responder_id = vr.id
        JOIN users u ON vr.user_id = u.id
        WHERE mm.mission_id = $1;
    `;
    const { rows } = await db.query(query, [missionId]);
    return rows;
}

async function updateStatus(missionId, responderId, status) {
    const query = `
        UPDATE mission_members 
        SET status = $1, joined_at = CURRENT_TIMESTAMP 
        WHERE mission_id = $2 AND responder_id = $3
        RETURNING mission_id, responder_id, status AS current_status, joined_at AS joined_time;
    `;
    const { rows } = await db.query(query, [status, missionId, responderId]);
    return rows[0];
}

async function remove(missionId, responderId) {
    const { rowCount } = await db.query('DELETE FROM mission_members WHERE mission_id = $1 AND responder_id = $2;', [missionId, responderId]);
    return rowCount > 0;
}

module.exports = { invite, getMembers, updateStatus, remove };
