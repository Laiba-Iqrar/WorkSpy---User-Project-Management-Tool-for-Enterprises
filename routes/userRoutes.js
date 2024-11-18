// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('/register', userController.showRegisterPage); // Correct usage
router.post('/register', userController.registerUser);    // Correct usage
router.get('/', userController.showLandingPage);          // Correct usage

module.exports = router;

