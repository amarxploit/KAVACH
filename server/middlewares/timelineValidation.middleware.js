const validateTimelineCreate = (req, res, next) => {
    const { event_type, title, description } = req.body;
    if (!event_type || !title || !description) {
        return res.status(400).json({ success: false, message: "Event Type, Event Title, and Descriptions are required fields." });
    }
    next();
};

const validateAdminAccess = (req, res, next) => {
    const role = req.headers['x-user-role'];
    if (!role || role !== 'admin') {
        return res.status(403).json({ success: false, message: "Access Denied. Admin permissions required." });
    }
    next();
};

module.exports = { validateTimelineCreate, validateAdminAccess };
