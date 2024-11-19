const db = require('../db');

// User Dashboard
async function getUserDashboard(req, res) {
    const { userId, role } = req.user; // Assuming JWT Middleware provides this
    try {
        const [taskSummary] = await db.execute(`
            SELECT 
                COUNT(*) AS total_tasks,
                SUM(status = 'Completed') AS completed_tasks
            FROM tasks WHERE user_id = ?`, [userId]);

        const [pendingLeaves] = await db.execute(`
            SELECT COUNT(*) AS pending_leaves FROM leave_requests 
            WHERE user_id = ? AND status = 'pending'`, [userId]);

        const [hoursLogged] = await db.execute(`
            SELECT SUM(total_hours) AS total_hours FROM timesheets 
            WHERE user_id = ?`, [userId]);

        res.json({
            totalTasks: taskSummary[0].total_tasks,
            completedTasks: taskSummary[0].completed_tasks,
            pendingLeaves: pendingLeaves[0].pending_leaves,
            totalHoursLogged: hoursLogged[0].total_hours || 0
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching dashboard data', error: err.message });
    }
}

module.exports = { getUserDashboard };
