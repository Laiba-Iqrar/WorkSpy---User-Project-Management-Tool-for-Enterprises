const { findUserById,findUserByEmail } = require('../models/User');

async function loginPage(req, res) {
  if (req.session.userId) {
    return res.redirect('/dashboard');
  }
  res.render('login', { error: null });
}

const bcrypt = require('bcrypt'); // For password hashing comparison

async function login(req, res) {
  const { email, password } = req.body;

  // Validate user by email
  const user = await findUserByEmail(email);
  if (user) {
    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      req.session.userId = user.user_id; // Keep userId in session
      req.session.role = user.role; // Store role in session

      // Redirect based on role
      if (user.role === 'manager') {
        return res.redirect('/manager-dashboard');
      } else if (user.role === 'employee') {
        return res.redirect('/dashboard');
      }
    } else {
      return res.render('login', { error: 'Invalid email or password' });
    }
  } else {
    return res.render('login', { error: 'Invalid email or password' });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

module.exports = {  login, logout, loginPage };
