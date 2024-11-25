const db = require('../db');

async function viewTasksPage(req, res) {
  try {
    const [tasks] = await db.query(`
      SELECT t.task_id, t.task_description, t.status, u.first_name AS assigned_user
      FROM tasks t
      LEFT JOIN users u ON t.user_id = u.user_id
    `);
    res.render('m_tasks', { tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading tasks');
  }
}

async function viewTask(req, res) {
  const { taskId } = req.params;
  try {
    const [task] = await db.query('SELECT * FROM tasks WHERE task_id = ?', [taskId]);
    res.render('m_tasks/task_view', { task: task[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error viewing task');
  }
}

async function createTaskAction(req, res) {
  const { project_id, user_id, task_description, assign_by } = req.body;
  try {
    await db.query(
      'INSERT INTO tasks (project_id, user_id, task_description, assign_by) VALUES (?, ?, ?, ?)',
      [project_id, user_id, task_description, assign_by]
    );
    res.redirect('/m-tasks');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating task');
  }
}

async function getEditTask(req, res) {
  const { taskId } = req.params;
  try {
    const [task] = await db.query('SELECT * FROM tasks WHERE task_id = ?', [taskId]);
    res.render('m_tasks/task_edit', { task: task[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching task');
  }
}

async function postEditTask(req, res) {
  const { taskId } = req.params;
  const { task_description, status } = req.body;
  try {
    await db.query(
      'UPDATE tasks SET task_description = ?, status = ? WHERE task_id = ?',
      [task_description, status, taskId]
    );
    res.redirect('/m-tasks');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating task');
  }
}

async function deleteTaskAction(req, res) {
  const { taskId } = req.params;
  try {
    await db.query('DELETE FROM tasks WHERE task_id = ?', [taskId]);
    res.redirect('/m-tasks');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting task');
  }
}

async function getCreateTask(req, res) {
    try {
      // Fetch additional data (like available projects and users) for the form
      const [projects] = await db.query('SELECT project_id, project_name FROM projects');
      const [users] = await db.query('SELECT user_id, first_name, last_name FROM users');
  
      res.render('m_tasks/task_create', {
        projects,
        users,
        userId: req.session.userId, // Pass the userId explicitly
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error loading create task page');
    }
  }
  

module.exports = {
  viewTasksPage,
  viewTask,
  createTaskAction,
  postEditTask,
  deleteTaskAction,
  getEditTask,
  getCreateTask,
};
