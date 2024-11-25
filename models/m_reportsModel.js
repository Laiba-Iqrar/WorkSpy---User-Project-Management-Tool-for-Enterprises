const db = require('../db');

// Task Status Summary
async function getTaskStatusSummary(managerId) {
  const query = `
    SELECT status, COUNT(*) as count 
    FROM tasks
    GROUP BY status;
  `;
  const [results] = await db.execute(query);
  return results;
}

// Timesheet Summary
async function getTimesheetSummary(managerId) {
  const query = `
    SELECT status, SUM(total_hours) as total_hours 
    FROM timesheets
    GROUP BY status;
  `;
  const [results] = await db.execute(query);
  return results;
}

// Pending Approvals
async function getPendingApprovals(managerId) {
  const query = `
    SELECT COUNT(*) as pendingApprovals
    FROM approvals
    WHERE status = 'pending';
  `;
  const [results] = await db.execute(query);
  return results[0];
}

// Leave Request Summary
async function getLeaveRequestSummary(managerId) {
  const query = `
    SELECT leave_type, COUNT(*) as count 
    FROM leave_requests
    GROUP BY leave_type;
  `;
  const [results] = await db.execute(query);
  return results;
}

// Task Status Change Summary
async function getTaskStatusChangeSummary(managerId) {
  const query = `
    SELECT previous_status, new_status, COUNT(*) as count 
    FROM task_status_changes
    GROUP BY previous_status, new_status;
  `;
  const [results] = await db.execute(query);
  return results;
}

// Projects with deadlines
async function getProjectsWithDeadlines() {
    const query = `
      SELECT project_name, deadline 
      FROM projects 
      ORDER BY deadline ASC 
      LIMIT 5;
    `;
    const [results] = await db.execute(query);
    return results;
  }
  
  // Tasks with assignees
  async function getTasksWithAssignees() {
    const query = `
      SELECT tasks.task_description, users.user_id, CONCAT(users.first_name, ' ', users.last_name) as assignee
      FROM tasks
      JOIN users ON tasks.user_id = users.user_id
      LIMIT 5;
    `;
    const [results] = await db.execute(query);
    return results;
  }
  

module.exports = {
  getTaskStatusSummary,
  getTimesheetSummary,
  getPendingApprovals,
  getLeaveRequestSummary,
  getTaskStatusChangeSummary,
  getProjectsWithDeadlines,
  getTasksWithAssignees,
};
