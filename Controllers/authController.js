const { findUserById } = require('../models/User');

async function loginPage(req, res) {
  if (req.session.userId) {
    // If already logged in, redirect to dashboard
    return res.redirect('/dashboard');
  }
  res.render('login', { error: null });
}

async function login(req, res) {
  const { userId } = req.body;

  // Validate user
  const user = await findUserById(userId);
  if (user) {
    req.session.userId = user.user_id; // Save user ID in session
    res.redirect('/dashboard'); // Redirect to dashboard after successful login
  } else {
    res.render('login', { error: 'Invalid User ID' });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

module.exports = { loginPage, login, logout };
