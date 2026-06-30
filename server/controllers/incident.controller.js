const incidentRepo = require('../repositories/incident.repository');

const getAllIncidents = async (req, res) => {
    try {
        const data = await incidentRepo.getAll();
        res.status(200).json({ success: true, message: "Loaded incidents.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const createIncident = async (req, res) => {
    try {
        const data = await incidentRepo.create(req.body);
        res.status(201).json({ success: true, message: "Incident created.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getIncidentById = async (req, res) => {
    try {
        const data = await incidentRepo.getById(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: "Incident not found." });
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const updateIncident = async (req, res) => {
    try {
        const data = await incidentRepo.update(req.params.id, req.body);
        if (!data) return res.status(404).json({ success: false, message: "Incident not found." });
        res.status(200).json({ success: true, message: "Incident updated.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const deleteIncident = async (req, res) => {
    try {
        const success = await incidentRepo.delete(req.params.id);
        if (!success) return res.status(404).json({ success: false, message: "Incident not found." });
        res.status(200).json({ success: true, message: "Incident dismissed." });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getAllIncidents, createIncident, getIncidentById, updateIncident, deleteIncident };
