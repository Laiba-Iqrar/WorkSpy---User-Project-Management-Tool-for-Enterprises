const express = require('express');
const { applyForLeave, viewLeaveRequests } = require('../controllers/leaveController');
const router = express.Router();

router.get('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/login');
  viewLeaveRequests(req, res);
});
router.post('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/login');
  applyForLeave(req, res);
});

module.exports = router;
