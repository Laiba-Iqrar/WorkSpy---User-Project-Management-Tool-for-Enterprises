const db = require('../db');

const express = require('express');
const { managerDashboard, viewProjects, viewTasks, viewUsers, viewReports,updateLeaveRequest } = require('../controllers/m_dashboardController');
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
  // router.post('/update-leave-status', async (req, res) => {
  //   const { leaveId, status } = req.body;
    
  //   try {
  //     const [result] = await db.query(
  //       'UPDATE leave_requests SET status = ?, approval_date = NOW() WHERE leave_id = ?',
  //       [status, leaveId]
  //     );
      
  //     if (result.affectedRows > 0) {
  //       res.json({ success: true });
  //     } else {
  //       res.json({ success: false });
  //     }
  //   } catch (error) {
  //     console.error('Error updating leave status:', error);
  //     res.json({ success: false });
  //   }
  // });

// Route for updating leave request status (approve/reject)
router.post('/update-leave-request', updateLeaveRequest);
//   router.get('/view-reports', viewReports);


module.exports = router;
