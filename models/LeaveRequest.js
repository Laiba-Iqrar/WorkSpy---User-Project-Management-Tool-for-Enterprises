const db = require('../db');

// Apply for a leave
async function applyLeave({ userId, leaveType, startDate, endDate, reason }) {
  try {
    await db.query(
      `INSERT INTO leave_requests (user_id, leave_type, start_date, end_date, reason, created_by)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, leaveType, startDate, endDate, reason, userId]
    );
  } catch (error) {
    console.error("Database Error in applyLeave:", error);
    throw error;
  }
}

// Get all leave requests for a specific user
async function getLeaveRequests(userId) {
  try {
    const [rows] = await db.query(
      `SELECT leave_id, leave_type, start_date, end_date, reason, status
       FROM leave_requests
       WHERE user_id = ?`,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("Database Error in getLeaveRequests:", error);
    throw error;
  }
}

module.exports = { applyLeave, getLeaveRequests };
