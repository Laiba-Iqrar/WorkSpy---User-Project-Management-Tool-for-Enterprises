const express = require('express');
const { generateTaskReport } = require('../controllers/taskReportController');
const router = express.Router();

router.get('/task-reports', generateTaskReport);

module.exports = router;
