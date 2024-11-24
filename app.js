const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const timesheetRoutes = require('./routes/timesheetRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const taskReportRoutes = require('./routes/taskReportRoutes');
const mprojectRoutes = require('./routes/m_projectsRoutes');
const mTasksRoutes = require('./routes/m_tasksRoutes');
const mDashboardRoutes = require('./routes/m_dashboardRoutes');
const mUsersRoutes = require('./routes/m_usersRoutes');



// Other routes



const app = express();

// Middleware for session management
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to protect restricted routes
function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    res.redirect('/login');
  }
}

app.use('/', authRoutes); // Login & Dashboard
app.use('/timesheets', timesheetRoutes); // Timesheets
app.use('/leave', leaveRoutes); // Leave Requests
app.use('/reports', taskReportRoutes); // Task Reports
// app.use('/manager', isAuthenticated, managerRoutes);
app.use('/', mDashboardRoutes);
app.use('/m-projects', mprojectRoutes);
app.use('/m-tasks', mTasksRoutes);
app.use('/manager-users', mUsersRoutes);







// Protected routes
app.use(isAuthenticated); // Middleware applied here
app.use(userRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
