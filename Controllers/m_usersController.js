const { getUsers, addUser, removeUser } = require('../models/m_usersModel');

async function listUsers(req, res) {
  const managerId = req.session.userId;
  const users = await getUsers(managerId);
  res.render('m_users', { users });
}

async function createUser(req, res) {
  await addUser(req.body);
  res.redirect('/manager-users');
}

async function deleteUser(req, res) {
  const { userId } = req.params;
  await removeUser(userId);
  res.redirect('/manager-users');
}

module.exports = { listUsers, createUser, deleteUser };
