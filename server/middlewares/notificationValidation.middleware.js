const validateNotificationCreate = (req, res, next) => {
    const { user_id, title, message, type } = req.body;
    if (!user_id || !title || !message || !type) {
        return res.status(400).json({ success: false, message: "Recipient user_id, Title, Message, and Type are required." });
    }
    next();
};

module.exports = { validateNotificationCreate };
