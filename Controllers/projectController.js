// projectController.js
const db = require('../db');

// Create project
async function createProject(req, res) {
  const { project_name, description, milestone, deadline } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO projects (project_name, description, milestone, deadline) VALUES (?, ?, ?, ?)',
      [project_name, description, milestone, deadline]
    );
    res.status(201).json({ message: 'Project created successfully', projectId: result.insertId });
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
}

// View all projects
async function viewProjects(req, res) {
  try {
    const [projects] = await db.execute('SELECT * FROM projects');
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
}

// Update project details
async function updateProject(req, res) {
  const { projectId } = req.params;
  const { project_name, description, milestone, deadline } = req.body;

  try {
    await db.execute(
      'UPDATE projects SET project_name = ?, description = ?, milestone = ?, deadline = ? WHERE project_id = ?',
      [project_name, description, milestone, deadline, projectId]
    );
    res.json({ message: 'Project updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err.message });
  }
}

// Assign project to team members
async function assignProject(req, res) {
  const { projectId, userId } = req.body;

  try {
    // Assign user to project (implement assignment logic)
    res.json({ message: 'Project assigned to team member' });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning project', error: err.message });
  }
}

module.exports = { createProject, viewProjects, updateProject, assignProject };
