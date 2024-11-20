const db = require('../db');

// Fetch tasks by status for a user
async function getTasksByStatus(userId) {
  const [rows] = await db.query(
    `SELECT status, COUNT(*) AS count 
     FROM tasks 
     WHERE user_id = ? 
     GROUP BY status`,
    [userId]
  );
  return rows; // Returns an array of { status, count }
}

module.exports = { getTasksByStatus };
