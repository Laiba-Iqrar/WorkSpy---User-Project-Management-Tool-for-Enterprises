const { applyLeave, getLeaveRequests } = require('../models/leaveRequest');

// Apply for leave
async function applyForLeave(req, res) {
  const userId = req.session.userId; // Get user ID from session
  const { leaveType, startDate, endDate, reason } = req.body;

  if (!userId) {
    return res.redirect('/login');
  }

  try {
    console.log("Applying leave for userId:", userId); // Debugging
    await applyLeave({ userId, leaveType, startDate, endDate, reason });
    res.redirect('/leave'); // Redirect to leave list
  } catch (error) {
    console.error("Error in applyForLeave:", error);
    res.status(500).send('Error applying for leave');
  }
}

// View all leave requests
async function viewLeaveRequests(req, res) {
  const userId = req.session.userId;

  if (!userId) {
    return res.redirect('/login');
  }

  try {
    const leaveRequests = await getLeaveRequests(userId);
    res.render('viewLeaveRequests', { leaveRequests });
  } catch (error) {
    console.error("Error in viewLeaveRequests:", error);
    res.status(500).send('Error fetching leave requests');
  }
}

module.exports = { applyForLeave, viewLeaveRequests };
