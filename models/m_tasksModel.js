const db = require('../db');

async function getTasks(managerId) {
  const [tasks] = await db.query(
    'SELECT t.*, u.first_name AS assigned_user FROM tasks t JOIN users u ON t.user_id = u.user_id WHERE t.assign_by = ?',
    [managerId]
  );
  return tasks;
}

async function createTask(data, managerId) {
  const { project_id, user_id, task_description, deadline } = data;
  await db.query(
    'INSERT INTO tasks (project_id, user_id, assign_by, task_description, created_by) VALUES (?, ?, ?, ?, ?)',
    [project_id, user_id, managerId, task_description, managerId]
  );
}

async function updateTask(taskId, data) {
  const { status } = data;
  await db.query('UPDATE tasks SET status = ? WHERE task_id = ?', [status, taskId]);
}

module.exports = { getTasks, createTask, updateTask };
