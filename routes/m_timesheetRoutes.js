// routes/m_timesheetRoutes.js
const express = require('express');
const { m_viewTimesheets, m_updateApproval } = require('../Controllers/m_timesheetController');
const router = express.Router();
const { ensureManager } = require('../authMiddleware');

// Timesheet routes
router.get('/', ensureManager, m_viewTimesheets); // View timesheets with filter
router.post('/approve', ensureManager, m_updateApproval); // Approve/Reject timesheet

module.exports = router;
