const express = require('express');
const router = express.Router({ mergeParams: true });
const memberController = require('../controllers/member.controller');
const { validateMemberInvite, validateMemberAction } = require('../middlewares/memberValidation.middleware');

router.get('/', memberController.getMissionMembers);
router.post('/', validateMemberInvite, memberController.inviteMissionMember);
router.patch('/:memberId', validateMemberAction, memberController.updateMemberStatus);
router.delete('/:memberId', validateMemberAction, memberController.removeMissionMember);
router.post('/:memberId/accept', validateMemberAction, memberController.acceptMissionInvitation);
router.post('/:memberId/reject', validateMemberAction, memberController.rejectMissionInvitation);

module.exports = router;
