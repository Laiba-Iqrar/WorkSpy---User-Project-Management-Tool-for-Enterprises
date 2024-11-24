const db = require('../db');

// Fetch all users under a manager
async function getUsersUnderManager(managerId) {
  const [users] = await db.query(
    `SELECT u.user_id, u.first_name, u.last_name, u.email, u.role, u.is_active 
     FROM users u 
     WHERE u.role = 'employee' AND u.user_id IN (
       SELECT DISTINCT t.user_id FROM tasks t WHERE t.assign_by = ?
     )`,
    [managerId]
  );
  return users;
}

// Add a new user
async function addUser(userData) {
  const { firstName, lastName, email, password, role } = userData;

  const result = await db.query(
    'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [firstName, lastName, email, password, role]
  );
  return result.insertId;
}

// Delete a user
async function deleteUser(userId) {
  await db.query('UPDATE users SET is_active = FALSE WHERE user_id = ?', [userId]);
}

module.exports = { getUsersUnderManager, addUser, deleteUser };
