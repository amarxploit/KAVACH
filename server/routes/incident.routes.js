const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incident.controller');
const { validateIncidentCreate, validateIncidentUpdate } = require('../middlewares/missionValidation.middleware');

router.get('/', incidentController.getAllIncidents);
router.post('/', validateIncidentCreate, incidentController.createIncident);
router.get('/:id', incidentController.getIncidentById);
router.patch('/:id', validateIncidentUpdate, incidentController.updateIncident);
router.delete('/:id', incidentController.deleteIncident);

module.exports = router;
