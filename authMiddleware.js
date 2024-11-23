// authMiddleware.js
const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

function ensureManager(req, res, next) {
  if (req.session.role === 'manager') {
    return next();
  }
  res.redirect('/login');
}

function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
}

module.exports = {authenticateJWT, ensureManager, ensureAuthenticated };

