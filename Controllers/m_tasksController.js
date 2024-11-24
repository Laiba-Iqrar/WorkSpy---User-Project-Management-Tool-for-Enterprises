
const db = require('../db'); // Update path as needed
const { getTasks, createTask, updateTask, deleteTask } = require('../models/m_tasksModel');

async function viewTasksPage(req, res) {
  const filters = req.query;
  const tasks = await getTasks(req.session.userId, filters);
  res.render('m_tasks', { tasks, filters });
}

async function viewTask(req, res) {
  const { taskId } = req.params;
  const task = await getTasks(taskId);
  res.render('m_tasks/task_view', { task });
}

async function editTaskPage(req, res) {
  const { taskId } = req.params;
  const task = await getTasks(taskId);
  res.render('m_tasks/task_edit', { task });
}

async function editTaskAction(req, res) {
  const { taskId } = req.params;
  const updates = req.body;
  await updateTask(taskId, { ...updates, updatedBy: req.session.userId });
  res.redirect('/m-tasks');
}
async function updateTaskAction(req, res) {
    const { taskId } = req.params; // Extract taskId from URL
    const { task_description, assigned_user, status } = req.body; // Extract form data
  
    try {
      await db.query(
        'UPDATE tasks SET task_description = ?, assigned_user = ?, status = ? WHERE task_id = ?',
        [task_description, assigned_user, status, taskId]
      );
      res.redirect('/m-tasks'); // Redirect to tasks page after successful update
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).send('Error updating task');
    }
  }
  
  
async function deleteTaskAction(req, res) {
  const { taskId } = req.params;
  await deleteTask(taskId);
  res.redirect('/m-tasks');
}

async function createTaskAction(req, res) {
  const taskData = req.body;
  await createTask({ ...taskData, createdBy: req.session.userId });
  res.redirect('/m-tasks');
}
async function getEditTask(req, res) {
  const { taskId } = req.params;

  try {
    const [tasks] = await db.query('SELECT * FROM tasks WHERE task_id = ?', [taskId]);
    if (tasks.length === 0) {
      return res.status(404).send('Task not found');
    }

    res.render('m_tasks/task_edit', { task: tasks[0] }); // Pass the first task
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).send('Internal Server Error1');
  }
}
  
  // Handle task edit form submission
// Handle form submission
async function postEditTask(req, res) {
    const { taskId } = req.params;
    const { task_description, assigned_user, status } = req.body;
  
    try {
      await db.query(
        'UPDATE tasks SET task_description = ?, user_id = ?, status = ? WHERE task_id = ?',
        [task_description, assigned_user, status, taskId]
      );
      res.redirect('/m-tasks'); // Redirect to the list page
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).send('Internal Server Error2');
    }
  }
module.exports = {
  viewTasksPage,
  viewTask,
  editTaskPage,
  editTaskAction,
  deleteTaskAction,
  createTaskAction,
  updateTaskAction,
  postEditTask,
  getEditTask,
};
