const db = require('../database/db');

const validateTaskCreate = async (req, res, next) => {
    const { missionId } = req.params;
    const { responder_id, task_type } = req.body;
    if (!responder_id || !task_type) {
        return res.status(400).json({ success: false, message: "Responder ID and Task Type are required." });
    }
    try {
        const member = await db.query('SELECT status FROM mission_members WHERE mission_id = $1 AND responder_id = $2 AND status = \'Accepted\';', [missionId, responder_id]);
        if (member.rows.length === 0) {
            return res.status(400).json({ success: false, message: "Target responder must be an accepted member of the active mission." });
        }
        next();
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const validateTaskAction = async (req, res, next) => {
    const { taskId } = req.params;
    try {
        const task = await db.query('SELECT status FROM mission_tasks WHERE id = $1;', [taskId]);
        if (task.rows.length === 0) return res.status(404).json({ success: false, message: "Task not found." });
        if (task.rows[0].status === 'Completed') {
            return res.status(400).json({ success: false, message: "Immutable. Completed tasks cannot be modified." });
        }
        next();
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { validateTaskCreate, validateTaskAction };
