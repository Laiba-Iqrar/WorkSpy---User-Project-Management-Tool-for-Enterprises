const db = require('../db');

// Fetch all tasks with filters
async function getTasks(managerId, filters = {}) {
  const { project, status, user } = filters;

  let query = `
    SELECT 
      t.task_id, t.task_description, t.status, 
      t.updated_at, u.first_name AS assigned_user, 
      ts.total_hours 
    FROM tasks t
    LEFT JOIN users u ON t.user_id = u.user_id
    LEFT JOIN timesheets ts ON t.task_id = ts.task_id
    WHERE t.assign_by = ?
  `;
  const params = [managerId];

  if (project) {
    query += ' AND t.project_id = ?';
    params.push(project);
  }
  if (status) {
    query += ' AND t.status = ?';
    params.push(status);
  }
  if (user) {
    query += ' AND t.user_id = ?';
    params.push(user);
  }

  const [tasks] = await db.query(query, params);
  return tasks;
}

// Create a new task
async function createTask(taskData) {
  const { projectId, userId, assignBy, description, status, createdBy } = taskData;

  const result = await db.query(
    'INSERT INTO tasks (project_id, user_id, assign_by, task_description, status, created_by) VALUES (?, ?, ?, ?, ?, ?)',
    [projectId, userId, assignBy, description, status || 'Not Started', createdBy]
  );
  return result.insertId;
}

// Update task details
async function updateTask(taskId, updates) {
  const { status, description, updatedBy } = updates;

  await db.query(
    'UPDATE tasks SET status = ?, task_description = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP WHERE task_id = ?',
    [status, description, updatedBy, taskId]
  );
}

// Delete a task
async function deleteTask(taskId) {
  await db.query('DELETE FROM tasks WHERE task_id = ?', [taskId]);
}

module.exports = { getTasks, createTask, updateTask, deleteTask }; // Export deleteTask
