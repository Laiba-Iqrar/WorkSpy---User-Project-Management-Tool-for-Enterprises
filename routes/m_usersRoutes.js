const express = require('express');
const { viewUsersPage, addUserAction, deleteUserAction } = require('../Controllers/m_usersController');

const router = express.Router();

router.get('/manager-users', viewUsersPage);
router.post('/manager-users/add', addUserAction);
router.post('/manager-users/:userId/delete', deleteUserAction);

module.exports = router;
