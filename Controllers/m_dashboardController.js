const { getDashboardMetrics, getNotifications, getQuickActions } = require('../models/m_dashboardModel');

async function managerDashboard(req, res) {
  try {
    console.log('Session Data:', req.session);
    console.log('Manager Dashboard Controller Invoked');

    const userId = req.session.userId;
    const metrics = await getDashboardMetrics(userId);
    const notifications = await getNotifications(userId);
    const quickActions = getQuickActions();

    res.render('m_dashboard', { metrics, notifications, quickActions });
  } catch (error) {
    console.error('Error in managerDashboard:', error);
    res.status(500).send('Error loading dashboard controller');
  }
}

async function viewProjects(req, res) {
  res.redirect('/m-projects');
}

async function viewTasks(req, res) {
  res.redirect('/m-tasks');
}

async function viewUsers(req, res) {
  res.redirect('/m-users');
}

async function viewReports(req, res) {
  res.redirect('/reports/m-task-reports');
}

module.exports = {
  managerDashboard,
  viewProjects,
  viewTasks,
  viewUsers,
  viewReports,
};
