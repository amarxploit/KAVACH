const db = require('../database/db');

const validateMissionCreate = async (req, res, next) => {
    const { incident_id, officer_id } = req.body;
    if (!incident_id || !officer_id) {
        return res.status(400).json({ success: false, message: "Incident ID and Officer ID are required." });
    }
    try {
        const incident = await db.query('SELECT id FROM incidents WHERE id = $1;', [incident_id]);
        const officer = await db.query('SELECT id FROM users WHERE id = $1 AND role = \'officer\';', [officer_id]);
        if (incident.rows.length === 0 || officer.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Valid active Incident and Officer roles must exist." });
        }
        next();
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const checkMissionStateBeforeWrite = async (req, res, next) => {
    const { id } = req.params;
    try {
        const mission = await db.query('SELECT status FROM missions WHERE id = $1;', [id]);
        if (mission.rows.length === 0) return res.status(404).json({ success: false, message: "Mission not found." });
        if (['Completed', 'Cancelled'].includes(mission.rows[0].status)) {
            return res.status(400).json({ success: false, message: "Mutation denied. Mission is already closed." });
        }
        next();
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const validateIncidentCreate = (req, res, next) => {
    const { category, priority, latitude, longitude } = req.body;
    if (!category || !priority || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ success: false, message: "Missing required fields: category, priority, latitude, longitude." });
    }
    next();
};

const validateIncidentUpdate = (req, res, next) => {
    next();
};

module.exports = { validateMissionCreate, checkMissionStateBeforeWrite, validateIncidentCreate, validateIncidentUpdate };
