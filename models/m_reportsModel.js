const db = require('../db');

// Fetch aggregated task data
async function getTaskStatusSummary(managerId) {
  const [rows] = await db.query(
    `
    SELECT status, COUNT(*) AS count
    FROM tasks
    WHERE assign_by = ?
    GROUP BY status
    `,
    [managerId]
  );
  return rows;
}

// Fetch timesheet data
async function getTimesheetSummary(managerId) {
  const [rows] = await db.query(
    `
    SELECT t.status, SUM(t.total_hours) AS total_hours
    FROM timesheets t
    JOIN tasks ta ON t.task_id = ta.task_id
    WHERE ta.assign_by = ?
    GROUP BY t.status
    `,
    [managerId]
  );
  return rows;
}

// Fetch pending approvals
async function getPendingApprovals(managerId) {
  const [rows] = await db.query(
    `
    SELECT COUNT(*) AS pending_approvals
    FROM approvals
    WHERE manager_id = ? AND status = 'pending'
    `,
    [managerId]
  );
  return rows[0]?.pending_approvals || 0;
}
// Fetch leave request summary
async function getLeaveRequestSummary(managerId) {
    const [rows] = await db.query(
      `
      SELECT leave_type, COUNT(*) AS count
      FROM leave_requests
      WHERE status = 'pending'
      GROUP BY leave_type
      `
    );
    return rows;
}
  
  // Fetch task status changes summary
async function getTaskStatusChangeSummary(managerId) {
    const [rows] = await db.query(
      `
      SELECT new_status, COUNT(*) AS count
      FROM task_status_changes
      WHERE changed_by = ?
      GROUP BY new_status
      `,
      [managerId]
    );
    return rows;
}

module.exports = {
  getTaskStatusSummary,
  getTimesheetSummary,
  getPendingApprovals,
  getLeaveRequestSummary,
  getTaskStatusChangeSummary,
};
