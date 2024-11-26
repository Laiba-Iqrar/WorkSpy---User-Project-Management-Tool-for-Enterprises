const express = require('express');
const { managerDashboard, viewProjects, viewTasks, viewUsers, viewReports } = require('../controllers/m_dashboardController');
// const { ensureManager } = require('../authMiddleware');

const router = express.Router();

// Secure all manager routes
router.get('/manager-dashboard', managerDashboard);
router.get('/manager-projects', viewProjects);
router.get('/m-tasks', async (req, res) => {
    const { viewTasksPage } = require('../Controllers/m_tasksController');
    await viewTasksPage(req, res);
  });

router.get('/manager-users', async (req, res) => {
    const { viewUsersPage } = require('../Controllers/m_usersController');
    await viewUsersPage(req, res);
  });

//   router.get('/view-reports', viewReports);


module.exports = router;
