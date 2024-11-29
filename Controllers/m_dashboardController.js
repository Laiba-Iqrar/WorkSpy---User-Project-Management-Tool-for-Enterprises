const { getDashboardMetrics, getNotifications, getQuickActions ,updateLeaveRequestStatus} = require('../models/m_dashboardModel');

async function managerDashboard(req, res) {
  try {
    const userId = req.session.userId; // Current manager's ID
    const metrics = await getDashboardMetrics(userId);
    const notifications = await getNotifications(userId);
    const quickActions = getQuickActions();

    res.render('m_dashboard', { metrics, notifications, quickActions });
  } catch (error) {
    console.error('Error in managerDashboard:', error);
    res.status(500).send('Error loading dashboard');
  }
}


async function updateLeaveRequest(req, res) {
  const { leaveId, action } = req.body;
  const userId = req.session.userId;

  try {
    if (!leaveId || !['approve', 'reject'].includes(action)) {
      return res.status(400).json({ success: false, message: 'Invalid action or missing leave ID' });
    }

    const status = action === 'approve' ? 'approved' : 'rejected';
    const isUpdated = await updateLeaveRequestStatus(leaveId, status, userId);

    if (isUpdated) {
      res.json({ success: true, message: `Leave request ${status}`, leaveId });
    } else {
      res.status(400).json({ success: false, message: 'Failed to update leave request' });
    }
  } catch (error) {
    console.error('Error updating leave request:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}



async function viewProjects(req, res) {
  res.redirect('/m-projects');
}

async function viewTasks(req, res) {
  res.redirect('/m-tasks');
}

async function viewUsers(req, res) {
  res.redirect('/manager-users');
}

// function viewReports(req, res) {
//   res.redirect('/manager-dashboard');
// }





module.exports = {
  managerDashboard,
  viewProjects,
  viewTasks,
  viewUsers,
  updateLeaveRequest,

  
};
