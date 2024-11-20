const db = require('../db');

// Fetch task counts grouped by status for a specific user
async function fetchTaskStatusCounts(userId) {
  const [rows] = await db.query(
    `SELECT status, COUNT(*) as count
     FROM tasks
     WHERE user_id = ?
     GROUP BY status`,
    [userId]
  );
  return rows;
}

async function fetchWeeklyHours(userId) {
    const [rows] = await db.query(
      `SELECT created_at AS date, total_hours 
       FROM timesheets
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 30`,
      [userId]
    );
    return rows;

  }

  async function fetchTimesheetApprovalStatus(userId) {
    try {
      const [rows] = await db.query(
        `SELECT 
          approvals.status, 
          COUNT(*) AS count 
         FROM approvals 
         INNER JOIN timesheets ON approvals.timesheet_id = timesheets.timesheet_id
         WHERE timesheets.user_id = ?
         GROUP BY approvals.status`,
        [userId]
      );
      return rows;
    } catch (error) {
      console.error("Error fetching timesheet approval status:", error.message);
      throw error;
    }
  }
  
  
module.exports = { fetchTaskStatusCounts ,fetchWeeklyHours,fetchTimesheetApprovalStatus};
