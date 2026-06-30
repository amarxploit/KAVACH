const express = require('express');
const router = express.Router({ mergeParams: true });
const timelineController = require('../controllers/timeline.controller');
const { validateTimelineCreate, validateAdminAccess } = require('../middlewares/timelineValidation.middleware');

router.get('/', timelineController.getMissionTimeline);
router.post('/', validateTimelineCreate, timelineController.createTimelineEvent);
router.delete('/:eventId', validateAdminAccess, timelineController.deleteTimelineEvent);

module.exports = router;
