const responderRepo = require('../repositories/responder.repository');

const getAllResponders = async (req, res) => {
    try {
        const data = await responderRepo.getAll();
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getResponderById = async (req, res) => {
    try {
        const data = await responderRepo.getById(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: "Profile not found." });
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const createResponder = async (req, res) => {
    try {
        const data = await responderRepo.create(req.body);
        res.status(201).json({ success: true, message: "Registered.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const updateResponder = async (req, res) => {
    try {
        const data = await responderRepo.update(req.params.id, req.body);
        if (!data) return res.status(404).json({ success: false, message: "Profile not found." });
        res.status(200).json({ success: true, message: "Updated.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const deleteResponder = async (req, res) => {
    try {
        const success = await responderRepo.delete(req.params.id);
        if (!success) return res.status(404).json({ success: false, message: "Profile not found." });
        res.status(200).json({ success: true, message: "Profile deleted." });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getNearbyResponders = async (req, res) => {
    try {
        const { latitude, longitude, radius } = req.query;
        const data = await responderRepo.getNearby(latitude, longitude, radius);
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getAllResponders, getResponderById, createResponder, updateResponder, deleteResponder, getNearbyResponders };
