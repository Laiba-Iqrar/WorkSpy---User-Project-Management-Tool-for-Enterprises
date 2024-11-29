const db = require('../db');

// Save a new timesheet
async function saveTimesheet({ userId, taskId, totalHours, status, comments }) {
  await db.query(
    `INSERT INTO timesheets (user_id, task_id, total_hours, status, comments, created_by)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, taskId, totalHours, status, comments, userId]
  );
}

// Get timesheets for a specific user
async function getTimesheets(userId) {
  const [rows] = await db.query(
    `SELECT ts.timesheet_id, t.task_description, ts.total_hours, ts.status, ts.comments
     FROM timesheets ts
     JOIN tasks t ON ts.task_id = t.task_id
     WHERE ts.user_id = ?`,
    [userId]
  );
  return rows;
}

// Get tasks for a specific user
async function getTasksForUser(userId) {
  const [rows] = await db.query(
    `SELECT task_id, task_description FROM tasks WHERE user_id = ?`,
    [userId]
  );
  return rows;
}

// Update task status
async function updateTaskStatus(taskId, status) {
  await db.query(
    `UPDATE tasks SET status = ? WHERE task_id = ?`,
    [status, taskId]
  );
}

module.exports = { saveTimesheet, getTimesheets, getTasksForUser, updateTaskStatus };
