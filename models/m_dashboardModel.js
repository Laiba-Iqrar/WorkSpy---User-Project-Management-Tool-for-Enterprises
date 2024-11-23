const db = require('../db');

// Fetch dashboard metrics for widgets
async function getDashboardMetrics(managerId) {
  const [projects] = await db.query(
    'SELECT COUNT(*) AS total_projects FROM projects WHERE created_by = ?',
    [managerId]
  );
  const [tasks] = await db.query(
    'SELECT COUNT(*) AS active_tasks FROM tasks WHERE assign_by = ? AND status != "Completed"',
    [managerId]
  );
  const [approvals] = await db.query(
    'SELECT COUNT(*) AS pending_approvals FROM approvals WHERE manager_id = ? AND status = "pending"',
    [managerId]
  );

  return {
    totalProjects: projects[0]?.total_projects || 0,
    activeTasks: tasks[0]?.active_tasks || 0,
    pendingApprovals: approvals[0]?.pending_approvals || 0,
  };
}

// Fetch notifications
async function getNotifications(managerId) {
  const [leaveRequests] = await db.query(
    'SELECT * FROM leave_requests WHERE created_by = ? AND status = "pending"',
    [managerId]
  );
  const [deadlines] = await db.query(
    'SELECT * FROM projects WHERE created_by = ? AND deadline >= CURDATE() AND deadline <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)',
    [managerId]
  );

  return {
    pendingLeaveRequests: leaveRequests,
    upcomingDeadlines: deadlines,
  };
}

// Quick actions data
function getQuickActions() {
  return [
    { label: 'View Projects', link: '/manager-projects' },
    { label: 'View Tasks', link: '/manager-tasks' },
    { label: 'View Users', link: '/manager-users' },
    { label: 'View Reports', link: '/manager-reports' },
  ];
}

module.exports = { getDashboardMetrics, getNotifications, getQuickActions };
