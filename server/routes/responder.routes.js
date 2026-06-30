const express = require('express');
const router = express.Router();
const responderController = require('../controllers/responder.controller');
const { validateResponderCreate, validateNearbySearch } = require('../middlewares/hospitalValidation.middleware');

router.get('/nearby', validateNearbySearch, responderController.getNearbyResponders);
router.get('/', responderController.getAllResponders);
router.post('/', validateResponderCreate, responderController.createResponder);
router.get('/:id', responderController.getResponderById);
router.patch('/:id', responderController.updateResponder);
router.delete('/:id', responderController.deleteResponder);

module.exports = router;
