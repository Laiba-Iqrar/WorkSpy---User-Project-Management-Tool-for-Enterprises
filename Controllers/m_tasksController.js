const { getTasks, updateTask, createTask } = require('../models/m_tasksModel');

async function listTasks(req, res) {
  const userId = req.session.userId;
  const tasks = await getTasks(userId);
  res.render('m_tasks', { tasks });
}

async function createNewTask(req, res) {
  await createTask(req.body, req.session.userId);
  res.redirect('/manager-tasks');
}

async function updateTaskStatus(req, res) {
  const { taskId } = req.params;
  await updateTask(taskId, req.body);
  res.redirect('/manager-tasks');
}

module.exports = { listTasks, createNewTask, updateTaskStatus };
