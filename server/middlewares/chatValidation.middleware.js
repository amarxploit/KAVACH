const db = require('../database/db');

const validateMessageSend = async (req, res, next) => {
    const { missionId } = req.params;
    const { sender_id, message } = req.body;
    if (!sender_id || !message) {
        return res.status(400).json({ success: false, message: "Sender ID and Message details are required." });
    }
    try {
        const mission = await db.query('SELECT officer_id FROM missions WHERE id = $1;', [missionId]);
        if (mission.rows.length === 0) return res.status(404).json({ success: false, message: "Mission not found." });
        next();
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const validateChatParticipant = async (req, res, next) => {
    next();
};

module.exports = { validateMessageSend, validateChatParticipant };
