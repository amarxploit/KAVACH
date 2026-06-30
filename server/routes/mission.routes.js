const express = require('express');
const router = express.Router();
const missionController = require('../controllers/mission.controller');
const memberRoutes = require('./member.routes');
const taskRoutes = require('./task.routes');
const chatRoutes = require('./chat.routes');
const timelineRoutes = require('./timeline.routes');
const aiRoutes = require('./ai.routes');
const { validateMissionCreate, checkMissionStateBeforeWrite } = require('../middlewares/missionValidation.middleware');

router.use('/:missionId/members', memberRoutes);
router.use('/:missionId/tasks', taskRoutes);
router.use('/:missionId/chat', chatRoutes);
router.use('/:missionId/timeline', timelineRoutes);
router.use('/:missionId/ai', aiRoutes);

router.get('/', missionController.getAllMissions);
router.post('/', validateMissionCreate, missionController.createMission);
router.get('/:id', missionController.getMissionById);
router.patch('/:id', checkMissionStateBeforeWrite, missionController.updateMission);
router.delete('/:id', missionController.deleteMission);
router.post('/:id/start', missionController.startMission);
router.post('/:id/complete', missionController.completeMission);

module.exports = router;
