// models/User.js
const db = require('../db');

async function findUserById(userId) {
  const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
  return rows[0];
}

async function findTasksByUser(userId) {
  const [rows] = await db.query(
    'SELECT t.task_description, t.status FROM tasks t WHERE t.user_id = ?',
    [userId]
  );
  return rows;
}

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

// Correctly export all functions
module.exports = { findUserById, findTasksByUser, createUser, findUserByEmail };
