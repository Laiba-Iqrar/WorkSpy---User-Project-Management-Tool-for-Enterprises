const { findProjectsByManager } = require('../models/m_project');

async function managerDashboard(req, res) {
  if (req.session.role !== 'manager') {
    return res.redirect('/login'); // Restrict access if not a manager
  }

  const managerId = req.session.userId;
  const projects = await findProjectsByManager(managerId);

  res.render('managerDashboard', { user: req.session, projects });
}

module.exports = { managerDashboard };
