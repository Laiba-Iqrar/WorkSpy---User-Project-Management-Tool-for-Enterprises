const express = require('express');
const {
  viewTasksPage,
  viewTask,
  createTaskAction,
  postEditTask,
  deleteTaskAction,
  getEditTask,
  getCreateTask,
} = require('../controllers/m_tasksController');

const router = express.Router();

router.get('/', viewTasksPage);
router.get('/view/:taskId', viewTask);
router.get('/edit/:taskId', getEditTask);
router.post('/edit/:taskId', postEditTask);
router.post('/delete/:taskId', deleteTaskAction);
router.get('/create', getCreateTask); // Add this line
router.post('/create', createTaskAction);


module.exports = router;
