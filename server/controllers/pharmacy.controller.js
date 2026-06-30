const pharmacyRepo = require('../repositories/pharmacy.repository');

const getAllPharmacies = async (req, res) => {
    try {
        const data = await pharmacyRepo.getAll();
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getPharmacyById = async (req, res) => {
    try {
        const data = await pharmacyRepo.getById(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: "Pharmacy not found." });
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getNearbyPharmacies = async (req, res) => {
    try {
        const { latitude, longitude, radius } = req.query;
        const data = await pharmacyRepo.getNearby(latitude, longitude, radius);
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const createPharmacy = async (req, res) => {
    try {
        const data = await pharmacyRepo.create(req.body);
        res.status(201).json({ success: true, message: "Pharmacy created.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const updatePharmacy = async (req, res) => {
    try {
        const data = await pharmacyRepo.update(req.params.id, req.body);
        if (!data) return res.status(404).json({ success: false, message: "Pharmacy not found." });
        res.status(200).json({ success: true, message: "Pharmacy updated.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const deletePharmacy = async (req, res) => {
    try {
        const success = await pharmacyRepo.delete(req.params.id);
        if (!success) return res.status(404).json({ success: false, message: "Pharmacy not found." });
        res.status(200).json({ success: true, message: "Pharmacy deleted." });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getAllPharmacies, getPharmacyById, getNearbyPharmacies, createPharmacy, updatePharmacy, deletePharmacy };
