const hospitalRepo = require('../repositories/hospital.repository');

const getAllHospitals = async (req, res) => {
    try {
        const data = await hospitalRepo.getAll();
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getHospitalById = async (req, res) => {
    try {
        const data = await hospitalRepo.getById(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: "Hospital not found." });
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getNearbyHospitals = async (req, res) => {
    try {
        const { latitude, longitude, radius } = req.query;
        const data = await hospitalRepo.getNearby(latitude, longitude, radius);
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const createHospital = async (req, res) => {
    try {
        const data = await hospitalRepo.create(req.body);
        res.status(201).json({ success: true, message: "Hospital created.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const updateHospital = async (req, res) => {
    try {
        const data = await hospitalRepo.update(req.params.id, req.body);
        if (!data) return res.status(404).json({ success: false, message: "Hospital not found." });
        res.status(200).json({ success: true, message: "Hospital updated.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const deleteHospital = async (req, res) => {
    try {
        const success = await hospitalRepo.delete(req.params.id);
        if (!success) return res.status(404).json({ success: false, message: "Hospital not found." });
        res.status(200).json({ success: true, message: "Hospital deleted." });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getAllHospitals, getHospitalById, getNearbyHospitals, createHospital, updateHospital, deleteHospital };
