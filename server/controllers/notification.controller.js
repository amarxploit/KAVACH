const notificationRepo = require('../repositories/notification.repository');

const getAllNotifications = async (req, res) => {
    try {
        const data = await notificationRepo.getAll();
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getNotificationById = async (req, res) => {
    try {
        const data = await notificationRepo.getById(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: "Notification not found." });
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getUserNotifications = async (req, res) => {
    try {
        const data = await notificationRepo.getByUserId(req.params.userId);
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const createNotification = async (req, res) => {
    try {
        const data = await notificationRepo.create(req.body);
        res.status(201).json({ success: true, message: "Notification logged.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const markAsReadAction = async (req, res) => {
    try {
        const data = await notificationRepo.markAsRead(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: "Notification not found." });
        res.status(200).json({ success: true, message: "Marked read.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const success = await notificationRepo.delete(req.params.id);
        if (!success) return res.status(404).json({ success: false, message: "Notification not found." });
        res.status(200).json({ success: true, message: "Notification deleted." });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getAllNotifications, getNotificationById, getUserNotifications, createNotification, markAsReadAction, deleteNotification };
