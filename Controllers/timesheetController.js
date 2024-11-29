const { saveTimesheet, getTimesheets, getTasksForUser, updateTaskStatus } = require('../models/timesheet');

// Handle timesheet submission
async function fillTimesheet(req, res) {
  const userId = req.session.userId;
  const { taskId, totalHours, status, comments } = req.body;

  try {
    // Save the timesheet
    await saveTimesheet({ userId, taskId, totalHours, status, comments });

    // Update the task status based on the timesheet's status
    if (status === 'In Progress') {
      await updateTaskStatus(taskId, 'In Progress');
    } else if (status === 'Completed') {
      await updateTaskStatus(taskId, 'Completed');
    }

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
    const tasks = await getTasksForUser(userId); // Fetch tasks for dropdown
    res.render('timesheets', { timesheets, tasks });
  } catch (error) {
    console.error("Error fetching timesheets:", error);
    res.status(500).send('Error fetching timesheets');
  }
}

module.exports = { fillTimesheet, viewTimesheets };
