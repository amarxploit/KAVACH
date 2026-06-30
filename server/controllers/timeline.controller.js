const timelineRepo = require('../repositories/timeline.repository');

const getMissionTimeline = async (req, res) => {
    try {
        const data = await timelineRepo.getByMissionId(req.params.missionId);
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const createTimelineEvent = async (req, res) => {
    try {
        const data = await timelineRepo.create(req.params.missionId, req.body);
        res.status(201).json({ success: true, message: "Event logged.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const deleteTimelineEvent = async (req, res) => {
    try {
        const success = await timelineRepo.delete(req.params.eventId);
        if (!success) return res.status(404).json({ success: false, message: "Event not found." });
        res.status(200).json({ success: true, message: "Event cleared." });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getMissionTimeline, createTimelineEvent, deleteTimelineEvent };
