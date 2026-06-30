const db = require('../database/db');

const validateMemberInvite = async (req, res, next) => {
    const { missionId } = req.params;
    const { responder_id } = req.body;
    if (!responder_id) return res.status(400).json({ success: false, message: "responder_id is required." });
    try {
        const mission = await db.query('SELECT status FROM missions WHERE id = $1;', [missionId]);
        if (mission.rows.length === 0) return res.status(404).json({ success: false, message: "Mission not found." });
        if (['Completed', 'Cancelled'].includes(mission.rows[0].status)) {
            return res.status(400).json({ success: false, message: "Cannot add members to finalized missions." });
        }
        const duplicate = await db.query('SELECT status FROM mission_members WHERE mission_id = $1 AND responder_id = $2;', [missionId, responder_id]);
        if (duplicate.rows.length > 0) return res.status(409).json({ success: false, message: "Responder already assigned." });
        next();
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const validateMemberAction = async (req, res, next) => {
    const { missionId, memberId } = req.params;
    try {
        const match = await db.query('SELECT status FROM mission_members WHERE mission_id = $1 AND responder_id = $2;', [missionId, memberId]);
        if (match.rows.length === 0) return res.status(404).json({ success: false, message: "Member record not found." });
        next();
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { validateMemberInvite, validateMemberAction };
