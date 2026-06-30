/**
 * KAVACH - Auth Routes
 * Routes for customer registration and authentication sessions.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../middlewares/authValidation.middleware');

router.post('/register', validateRegister, authController.handleRegister);
router.post('/login', validateLogin, authController.handleLogin);

module.exports = router;
