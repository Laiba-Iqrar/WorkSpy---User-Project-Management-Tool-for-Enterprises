//m_usersController.js
const { getUsersUnderManager, addUser, deleteUser } = require('../models/m_usersModel');

// Display all users for the manager
async function viewUsersPage(req, res) {
  if (!req.session.userId) {
    return res.redirect('/login'); // Redirect if no session
  }

  try {
    const users = await getUsersUnderManager(req.session.userId);
    res.render('m_users', { users });
  } catch (error) {
    console.error('Error loading users page:', error);
    res.status(500).send('Error loading users page');
  }
}

// Add a new user with session's manager ID
async function addUserAction(req, res) {
  if (!req.session.userId) {
    return res.redirect('/login'); // Ensure session exists
  }

  try {
    const userData = req.body;
    const managerId = req.session.userId; // Get manager ID from session
    await addUser(userData, managerId);

    // Re-fetch updated user list and render
    const users = await getUsersUnderManager(managerId);
    res.render('m_users', { users });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }
}

// Delete a user (soft delete)
async function deleteUserAction(req, res) {
  try {
    const { userId } = req.params;
    await deleteUser(userId);
    res.redirect('/manager-users');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
}

module.exports = { viewUsersPage, addUserAction, deleteUserAction };
