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

async function getNotifications(managerId) {
  const [leaveRequests] = await db.query(`
      SELECT 
          leave_requests.leave_id,
          users.first_name,
          users.last_name,
          leave_requests.leave_type,
          leave_requests.start_date,
          leave_requests.end_date
      FROM leave_requests
      JOIN users ON leave_requests.user_id = users.user_id
      WHERE leave_requests.status = "pending"
  `);

  const [deadlines] = await db.query(`
      SELECT project_name, deadline
      FROM projects
      WHERE created_by = ? AND deadline >= CURDATE() AND deadline <= DATE_ADD(CURDATE(), INTERVAL 7 DAY)
  `, [managerId]);

  return {
      pendingLeaveRequests: leaveRequests,
      upcomingDeadlines: deadlines,
  };
}



// Update the leave request status
async function updateLeaveRequestStatus(leaveId, status, managerId) {
  try {
    const [result] = await db.query(
      'UPDATE leave_requests SET status = ?, approval_date = NOW(), updated_by = ? WHERE leave_id = ? AND status = "pending"',
      [status, managerId, leaveId]
    );
    return result.affectedRows > 0; 
  } catch (error) {
    console.error('Error updating leave request:', error);
    throw error;
  }
}



// Quick actions data
function getQuickActions() {
  return [
    { label: 'View Projects', link: '/manager-projects' },
    { label: 'View Tasks', link: '/m-tasks' },
    { label: 'View Users', link: '/manager-users' },
  ];
}

module.exports = { getDashboardMetrics, getNotifications, getQuickActions,updateLeaveRequestStatus, };
