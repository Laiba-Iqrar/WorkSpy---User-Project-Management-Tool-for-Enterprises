const express = require('express');
const { viewReports } = require('../controllers/m_reportsController');
const { ensureAuthenticated } = require('../authMiddleware');

const router = express.Router();

router.get('/view-reports', ensureAuthenticated, viewReports);

module.exports = router;
