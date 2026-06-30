const db = require('../database/db');

const getHealthStatus = async (req, res) => {
    try {
        const dbResult = await db.query('SELECT NOW()');
        return res.status(200).json({
            success: true,
            message: "System integrity verified.",
            data: { status: "running", database: "connected", project: "KAVACH", time: dbResult.rows[0].now }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Database offline.", error: error.message });
    }
};

module.exports = { getHealthStatus };
