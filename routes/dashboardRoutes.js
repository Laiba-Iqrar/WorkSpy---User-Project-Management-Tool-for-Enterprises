const express = require('express');
const { getUserDashboard } = require('../Controllers/dashboardController');
const router = express.Router();

router.get('/dashboard', getUserDashboard);

module.exports = router;
