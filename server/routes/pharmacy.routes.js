const express = require('express');
const router = express.Router();
const pharmacyController = require('../controllers/pharmacy.controller');
const { validatePharmacyCreate, validatePharmacyNearby } = require('../middlewares/pharmacyValidation.middleware');

router.get('/nearby', validatePharmacyNearby, pharmacyController.getNearbyPharmacies);
router.get('/', pharmacyController.getAllPharmacies);
router.post('/', validatePharmacyCreate, pharmacyController.createPharmacy);
router.get('/:id', pharmacyController.getPharmacyById);
router.patch('/:id', pharmacyController.updatePharmacy);
router.delete('/:id', pharmacyController.deletePharmacy);

module.exports = router;
