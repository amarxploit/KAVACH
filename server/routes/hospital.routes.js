const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospital.controller');
const { validateHospitalCreate, validateHospitalNearby } = require('../middlewares/hospitalValidation.middleware');

router.get('/nearby', validateHospitalNearby, hospitalController.getNearbyHospitals);
router.get('/', hospitalController.getAllHospitals);
router.post('/', validateHospitalCreate, hospitalController.createHospital);
router.get('/:id', hospitalController.getHospitalById);
router.patch('/:id', hospitalController.updateHospital);
router.delete('/:id', hospitalController.deleteHospital);

module.exports = router;
