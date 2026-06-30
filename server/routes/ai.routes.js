const express = require('express');
const router = express.Router({ mergeParams: true });
const aiController = require('../controllers/ai.controller');

router.get('/', aiController.getMissionRecommendations);
router.post('/generate', aiController.generateMissionRecommendations);
router.delete('/', aiController.clearMissionRecommendations);

module.exports = router;
