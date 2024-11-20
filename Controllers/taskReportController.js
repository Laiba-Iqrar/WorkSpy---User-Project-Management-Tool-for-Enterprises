const { fetchTaskStatusCounts, fetchWeeklyHours, fetchTimesheetApprovalStatus } = require('../models/taskReportModel');

async function generateTaskReport(req, res) {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/login');
  }

  try {
    // Fetch task status data
    const taskCounts = await fetchTaskStatusCounts(userId);
    const taskChartData = {
      labels: taskCounts.map(task => task.status),
      values: taskCounts.map(task => task.count),
    };

    // Fetch weekly hours data
    const weeklyHoursData = await fetchWeeklyHours(userId);
    const weeklyHoursChartData = {
      labels: weeklyHoursData.map(item => item.date.toISOString().split('T')[0]),
      values: weeklyHoursData.map(item => item.total_hours),
    };

    // Fetch timesheet approval data
    const timesheetData = await fetchTimesheetApprovalStatus(userId);
    const timesheetChartData = {
      labels: timesheetData.map(item => item.status),
      values: timesheetData.map(item => item.count),
    };

    // Render data for all charts
    res.render('taskReportPage', { 
      chartData: { 
        taskChartData, 
        weeklyHoursChartData, 
        timesheetChartData 
      } 
    });
  } catch (error) {
    console.error("Error generating task report:", error);
    res.status(500).send('Error generating task report');
  }
}

module.exports = { generateTaskReport };
