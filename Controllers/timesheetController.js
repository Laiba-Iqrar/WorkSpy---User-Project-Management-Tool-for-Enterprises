const { saveTimesheet, getTimesheets } = require('../models/timesheet');

// Handle timesheet submission
async function fillTimesheet(req, res) {
  const userId = req.session.userId;
  const { taskId, totalHours, status, comments } = req.body; // Add status to destructure
  try {
    await saveTimesheet({ userId, taskId, totalHours, status, comments });
    res.redirect('/timesheets');
  } catch (error) {
    console.error("Error saving timesheet:", error);
    res.status(500).send('Error saving timesheet');
  }
}

// Fetch and display all timesheets for the user
async function viewTimesheets(req, res) {
  const userId = req.session.userId;
  try {
    const timesheets = await getTimesheets(userId);
    res.render('timesheets', { timesheets });
  } catch (error) {
    console.error("Error fetching timesheets:", error);
    res.status(500).send('Error fetching timesheets');
  }
}

module.exports = { fillTimesheet, viewTimesheets };
