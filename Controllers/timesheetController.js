const { saveTimesheet, getTimesheets } = require('../models/timesheet');

async function fillTimesheet(req, res) {
  const userId = req.session.userId;
  const { taskId, totalHours, comments } = req.body;
  try {
    await saveTimesheet({ userId, taskId, totalHours, comments });
    res.redirect('/timesheets');
  } catch (error) {
    res.status(500).send('Error saving timesheet');
  }
}

async function viewTimesheets(req, res) {
  const userId = req.session.userId;
  try {
    const timesheets = await getTimesheets(userId);
    res.render('timesheets', { timesheets });
  } catch (error) {
    res.status(500).send('Error fetching timesheets');
  }
}

module.exports = { fillTimesheet, viewTimesheets };
