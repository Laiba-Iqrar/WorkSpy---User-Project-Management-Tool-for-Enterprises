const express = require('express');
const { applyForLeave, viewLeaveRequests } = require('../controllers/leaveController');
const router = express.Router();

// Middleware to protect routes
router.use((req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  next();
});

// GET: List all leave requests
router.get('/', viewLeaveRequests);

// GET: Apply for leave form
router.get('/apply-leave', (req, res) => {
  res.render('applyLeave'); // Render the apply leave form
});

// POST: Submit a leave request
router.post('/apply-leave', applyForLeave);

module.exports = router;
