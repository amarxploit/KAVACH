const memberRepo = require('../repositories/member.repository');

const getMissionMembers = async (req, res) => {
    try {
        const data = await memberRepo.getMembers(req.params.missionId);
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const inviteMissionMember = async (req, res) => {
    try {
        const data = await memberRepo.invite(req.params.missionId, req.body.responder_id);
        res.status(201).json({ success: true, message: "Member invited.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const updateMemberStatus = async (req, res) => {
    try {
        const { missionId, memberId } = req.params;
        const data = await memberRepo.updateStatus(missionId, memberId, req.body.status);
        res.status(200).json({ success: true, message: "Status updated.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const removeMissionMember = async (req, res) => {
    try {
        const { missionId, memberId } = req.params;
        const success = await memberRepo.remove(missionId, memberId);
        if (!success) return res.status(404).json({ success: false, message: "Member not found." });
        res.status(200).json({ success: true, message: "Member removed." });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const acceptMissionInvitation = async (req, res) => {
    try {
        const { missionId, memberId } = req.params;
        const data = await memberRepo.updateStatus(missionId, memberId, 'Accepted');
        res.status(200).json({ success: true, message: "Invitation accepted.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const rejectMissionInvitation = async (req, res) => {
    try {
        const { missionId, memberId } = req.params;
        const data = await memberRepo.updateStatus(missionId, memberId, 'Rejected');
        res.status(200).json({ success: true, message: "Invitation rejected.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getMissionMembers, inviteMissionMember, updateMemberStatus, removeMissionMember, acceptMissionInvitation, rejectMissionInvitation };
