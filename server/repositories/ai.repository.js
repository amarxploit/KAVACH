const db = require('../database/db');

async function generateRecommendations(missionId) {
    const query = `
        INSERT INTO ai_recommendations (mission_id, recommendation_type, description, confidence_score, status, created_at)
        VALUES ($1, 'System Action', '{"summary": "Mobilize HospitalTMH (Sakchi) and dispatch closest nurse Allen. Risk: Low"}', 95.00, 'Pending', CURRENT_TIMESTAMP)
        RETURNING id, mission_id, created_at, confidence_score, status, description;
    `;
    const { rows } = await db.query(query, [missionId]);
    const row = rows[0];
    const details = JSON.parse(row.description);
    return {
        recommendation_id: row.id,
        mission_id: row.mission_id,
        generated_time: row.created_at,
        confidence_score: Number(row.confidence_score),
        status: row.status,
        recommendation_summary: details.summary
    };
}

async function getByMissionId(missionId) {
    const query = 'SELECT id, mission_id, created_at, confidence_score, status, description FROM ai_recommendations WHERE mission_id = $1 ORDER BY created_at DESC;';
    const { rows } = await db.query(query, [missionId]);
    return rows.map(r => {
        const details = JSON.parse(r.description);
        return {
            recommendation_id: r.id,
            mission_id: r.mission_id,
            generated_time: r.created_at,
            confidence_score: Number(r.confidence_score),
            status: r.status,
            recommendation_summary: details.summary
        };
    });
}

async function deleteByMissionId(missionId) {
    const { rowCount } = await db.query('DELETE FROM ai_recommendations WHERE mission_id = $1;', [missionId]);
    return rowCount > 0;
}

module.exports = { generateRecommendations, getByMissionId, deleteByMissionId };
