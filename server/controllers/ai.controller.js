const aiRepo = require('../repositories/ai.repository');

const getMissionRecommendations = async (req, res) => {
    try {
        const data = await aiRepo.getByMissionId(req.params.missionId);
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const generateMissionRecommendations = async (req, res) => {
    try {
        const data = await aiRepo.generateRecommendations(req.params.missionId);
        res.status(201).json({ success: true, message: "Recommendations generated.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const clearMissionRecommendations = async (req, res) => {
    try {
        const success = await aiRepo.deleteByMissionId(req.params.missionId);
        res.status(200).json({ success: true, message: "History cleared." });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getMissionRecommendations, generateMissionRecommendations, clearMissionRecommendations };
