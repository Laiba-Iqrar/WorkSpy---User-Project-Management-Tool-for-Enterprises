const db = require('../db');
const bcrypt = require('bcrypt'); // For password hashing comparison


// Fetch all users under a manager
async function getUsersUnderManager(managerId) {
  const [users] = await db.query(
    `SELECT user_id, first_name, last_name, email, role, is_active
     FROM users
     WHERE manager_id = ? AND is_active = TRUE`,
    [managerId]
  );
  return users;
}

// Add a new user
async function addUser(userData, managerId) {
  const { firstName, lastName, email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.query(
    `INSERT INTO users (first_name, last_name, email, password, role, manager_id) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, email, hashedPassword, role, managerId]
  );
  return result.insertId;
}


// Delete a user
async function deleteUser(userId) {
  await db.query('UPDATE users SET is_active = FALSE WHERE user_id = ?', [userId]);
}

module.exports = { getUsersUnderManager, addUser, deleteUser };
