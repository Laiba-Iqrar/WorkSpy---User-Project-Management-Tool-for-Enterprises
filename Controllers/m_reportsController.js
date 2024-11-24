const {
    getTaskStatusSummary,
    getTimesheetSummary,
    getPendingApprovals,
    getLeaveRequestSummary,
    getTaskStatusChangeSummary,
  } = require('../models/m_reportsModel');
  
  async function viewReports(req, res) {
    try {
      const managerId = req.session.userId;
  
      const taskSummary = await getTaskStatusSummary(managerId);
      const timesheetSummary = await getTimesheetSummary(managerId);
      const pendingApprovals = await getPendingApprovals(managerId);
      const leaveRequestSummary = await getLeaveRequestSummary(managerId);
      const taskStatusChangeSummary = await getTaskStatusChangeSummary(managerId);
  
      res.render('m_reports', {
        taskSummary,
        timesheetSummary,
        pendingApprovals,
        leaveRequestSummary,
        taskStatusChangeSummary,
      });
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).send('Error generating reports');
    }
  }
  
  module.exports = { viewReports };
  