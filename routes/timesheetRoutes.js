//timesheetRoutes.js
const express = require('express');
const { fillTimesheet, viewTimesheets } = require('../controllers/timesheetController');
const router = express.Router();

router.get('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/login');
  viewTimesheets(req, res);
});
router.post('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.redirect('/login');
  fillTimesheet(req, res);
});

module.exports = router;
