const express = require('express');
const { managerDashboard } = require('../controllers/m_managerController');
const router = express.Router();

router.get('/dashboard', managerDashboard);

module.exports = router;
