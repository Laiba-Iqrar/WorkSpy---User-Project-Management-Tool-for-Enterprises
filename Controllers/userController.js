// userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { findUserById, findTasksByUser } = require('../models/User');


function showRegisterPage(req, res) {
  res.render('register'); // Render the 'register.ejs' view from the 'views' folder
}

// Show landing page
function showLandingPage(req, res) {
  res.render('index', { user: null }); // Render the 'index.ejs' view with a `user` variable (null by default)
}

// Register user
async function registerUser(req, res) {
  const { first_name, last_name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [result] = await db.execute(
      'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, hashedPassword, role]
    );
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
}

// Login user
async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, users[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: users[0].user_id, role: users[0].role }, 'secretkey', { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
}

// Update profile
async function updateProfile(req, res) {
  const { userId } = req.user; // assuming JWT middleware is used to get userId
  const { first_name, last_name, email } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE user_id = ?',
      [first_name, last_name, email, userId]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
}

// Change password
async function changePassword(req, res) {
  const { userId } = req.user; // assuming JWT middleware is used to get userId
  const { oldPassword, newPassword } = req.body;

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE user_id = ?', [userId]);
    const isMatch = await bcrypt.compare(oldPassword, users[0].password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await db.execute('UPDATE users SET password = ? WHERE user_id = ?', [hashedNewPassword, userId]);
    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error changing password', error: err.message });
  }
}

// Activate/Deactivate user
async function toggleUserActivation(req, res) {
  const { userId } = req.params;
  const { isActive } = req.body;

  try {
    await db.execute('UPDATE users SET is_active = ? WHERE user_id = ?', [isActive, userId]);
    res.json({ message: `User ${isActive ? 'activated' : 'deactivated'} successfully` });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user status', error: err.message });
  }
}

async function userDashboard(req, res) {
  const userId = req.session.userId;
  const user = await findUserById(userId); // Fetch user details
  const tasks = await findTasksByUser(userId); // Fetch tasks for user

  res.render('dashboard', { user, tasks });
}


module.exports = { registerUser, loginUser, updateProfile, changePassword, toggleUserActivation, showRegisterPage,  showLandingPage,userDashboard };
