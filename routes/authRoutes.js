const express = require('express');
const { loginPage, login, logout } = require('../controllers/authController');
const { userDashboard } = require('../controllers/userController');
const bcrypt = require('bcrypt'); // For password hashing comparison

const router = express.Router();

router.get('/login', loginPage);
router.post('/login', login);
router.get('/logout', logout);
router.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  userDashboard(req, res);
});

module.exports = router;
