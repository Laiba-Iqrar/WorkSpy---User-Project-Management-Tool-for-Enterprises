const express = require('express');
const { managerDashboard, viewProjects, viewTasks, viewUsers, viewReports } = require('../controllers/m_dashboardController');
// const { ensureManager } = require('../authMiddleware');

const router = express.Router();

// Secure all manager routes
router.get('/manager-dashboard', managerDashboard);
router.get('/manager-projects', viewProjects);
router.get('/manager-tasks', viewTasks);
router.get('/manager-users', viewUsers);
router.get('/manager-reports', viewReports);

module.exports = router;
