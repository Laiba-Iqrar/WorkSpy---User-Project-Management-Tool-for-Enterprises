const db = require('../db');

async function getUsers(managerId) {
  const [users] = await db.query(
    'SELECT * FROM users WHERE role = "employee" AND created_by = ?',
    [managerId]
  );
  return users;
}

async function addUser(data) {
  const { first_name, last_name, email, password } = data;
  await db.query(
    'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, "employee")',
    [first_name, last_name, email, password]
  );
}

async function removeUser(userId) {
  await db.query('DELETE FROM users WHERE user_id = ?', [userId]);
}

module.exports = { getUsers, addUser, removeUser };
