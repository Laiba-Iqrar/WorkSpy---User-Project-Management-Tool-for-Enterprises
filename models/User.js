// models/User.js
const db = require('../db');

async function createUser(firstName, lastName, email, password, role) {
  const [result] = await db.execute(
    'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [firstName, lastName, email, password, role]
  );
  return result.insertId;
}

async function findUserByEmail(email) {
  const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return users[0];
}

module.exports = { createUser, findUserByEmail };
