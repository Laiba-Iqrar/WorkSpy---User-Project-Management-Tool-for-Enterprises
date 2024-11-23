const { findUserById } = require('../models/User');

async function loginPage(req, res) {
  if (req.session.userId) {
    return res.redirect('/dashboard');
  }
  res.render('login', { error: null });
}

async function login(req, res) {
  const { userId } = req.body;

  // Validate user
  const user = await findUserById(userId);
  if (user) {
    req.session.userId = user.user_id;
    req.session.role = user.role; // Store role in session

    // Redirect based on role
    if (user.role === 'manager') {
      return res.redirect('/manager-dashboard');
    } else if (user.role === 'employee') {
      return res.redirect('/dashboard');
    }
  } else {
    res.render('login', { error: 'Invalid User ID' });
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}

module.exports = {  login, logout, loginPage };
