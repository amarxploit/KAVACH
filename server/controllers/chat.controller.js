const chatRepo = require('../repositories/chat.repository');

const getMissionChat = async (req, res) => {
    try {
        const data = await chatRepo.getByMissionId(req.params.missionId);
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getMessageById = async (req, res) => {
    try {
        const data = await chatRepo.getById(req.params.messageId);
        if (!data) return res.status(404).json({ success: false, message: "Message not found." });
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const createMessage = async (req, res) => {
    try {
        const data = await chatRepo.create(req.params.missionId, req.body);
        res.status(201).json({ success: true, message: "Message sent.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const softDeleteMessage = async (req, res) => {
    try {
        const data = await chatRepo.softDelete(req.params.messageId);
        if (!data) return res.status(404).json({ success: false, message: "Message not found." });
        res.status(200).json({ success: true, message: "Message deleted.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getMissionChat, getMessageById, createMessage, softDeleteMessage };
