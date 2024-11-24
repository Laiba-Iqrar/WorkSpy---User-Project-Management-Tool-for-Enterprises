// controllers/m_timesheetController.js
const db = require('../db');

// Fetch pending, approved, or rejected timesheets based on filter
async function m_viewTimesheets(req, res) {
    const filter = req.query.filter || 'pending'; // Default to 'pending'

    try {
        const [timesheets] = await db.execute(`
            SELECT 
                ts.timesheet_id, 
                CONCAT(u.first_name, ' ', u.last_name) AS employee_name, 
                t.task_description, 
                ts.total_hours, 
                ts.comments AS timesheet_comments, 
                a.status AS approval_status, 
                a.comments AS approval_comments 
            FROM timesheets ts
            INNER JOIN users u ON ts.user_id = u.user_id
            INNER JOIN tasks t ON ts.task_id = t.task_id
            LEFT JOIN approvals a ON ts.timesheet_id = a.timesheet_id
            WHERE a.status = ? OR (a.status IS NULL AND ? = 'pending')
            ORDER BY u.user_id
        `, [filter, filter]);

        const groupedTimesheets = timesheets.reduce((group, item) => {
            group[item.employee_name] = group[item.employee_name] || [];
            group[item.employee_name].push(item);
            return group;
        }, {});

        res.render('m_timesheets', { timesheets: groupedTimesheets, filter });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching timesheets', error: error.message });
    }
}

// Update timesheet approval
async function m_updateApproval(req, res) {
    const { timesheetId, status, comments } = req.body;
    const managerId = req.user.userId; // Assuming JWT or session middleware

    if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        await db.execute(`
            INSERT INTO approvals (timesheet_id, manager_id, status, comments, approval_date)
            VALUES (?, ?, ?, ?, NOW())
            ON DUPLICATE KEY UPDATE
                status = VALUES(status),
                comments = VALUES(comments),
                approval_date = VALUES(approval_date)
        `, [timesheetId, managerId, status, comments]);

        res.redirect('/m_timesheets?filter=pending'); // Redirect to pending filter
    } catch (error) {
        res.status(500).json({ message: 'Error updating approval', error: error.message });
    }
}

module.exports = { m_viewTimesheets, m_updateApproval };
