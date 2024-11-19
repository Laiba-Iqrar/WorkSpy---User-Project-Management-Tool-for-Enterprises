const db = require('../db');

async function saveTimesheet({ userId, taskId, totalHours, comments }) {
  await db.query(
    `INSERT INTO timesheets (user_id, task_id, total_hours, comments, created_by)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, taskId, totalHours, comments, userId]
  );
}

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

module.exports = { saveTimesheet, getTimesheets };
