const missionRepo = require('../repositories/mission.repository');

const getAllMissions = async (req, res) => {
    try {
        const data = await missionRepo.getAll();
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getMissionById = async (req, res) => {
    try {
        const data = await missionRepo.getById(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: "Mission not found." });
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const createMission = async (req, res) => {
    try {
        const data = await missionRepo.create(req.body);
        res.status(201).json({ success: true, message: "Mission initialized.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const updateMission = async (req, res) => {
    try {
        const data = await missionRepo.update(req.params.id, req.body);
        if (!data) return res.status(404).json({ success: false, message: "Mission not found." });
        res.status(200).json({ success: true, message: "Mission updated.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const startMission = async (req, res) => {
    try {
        const data = await missionRepo.startMission(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: "Mission not found." });
        res.status(200).json({ success: true, message: "Mission started.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const completeMission = async (req, res) => {
    try {
        const data = await missionRepo.completeMission(req.params.id);
        if (!data) return res.status(404).json({ success: false, message: "Mission not found." });
        res.status(200).json({ success: true, message: "Mission completed.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const deleteMission = async (req, res) => {
    try {
        const success = await missionRepo.delete(req.params.id);
        if (!success) return res.status(404).json({ success: false, message: "Mission not found." });
        res.status(200).json({ success: true, message: "Mission deleted." });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getAllMissions, getMissionById, createMission, updateMission, startMission, completeMission, deleteMission };
