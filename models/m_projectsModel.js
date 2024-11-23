const db = require('../db');

async function getProjects(userId) {
  const [projects] = await db.query('SELECT * FROM projects WHERE created_by = ?', [userId]);
  return projects;
}

async function getProjectDetails(projectId) {
    const [project] = await db.query('SELECT * FROM projects WHERE project_id = ?', [projectId]);
    if (project[0].deadline) {
      project[0].deadline = new Date(project[0].deadline); // Convert to Date object
    }
    return project[0];
  }
  

async function createProject(data, userId) {
  const { project_name, description, milestone, deadline } = data;
  await db.query(
    'INSERT INTO projects (project_name, description, milestone, deadline, created_by) VALUES (?, ?, ?, ?, ?)',
    [project_name, description, milestone, deadline, userId]
  );
}

async function updateProject(projectId, data) {
  const { project_name, description, milestone, deadline } = data;
  await db.query(
    'UPDATE projects SET project_name = ?, description = ?, milestone = ?, deadline = ? WHERE project_id = ?',
    [project_name, description, milestone, deadline, projectId]
  );
}

// In your model (m_projectsModel.js)
async function deleteProject(projectId) {
    const [result] = await db.query('DELETE FROM projects WHERE project_id = ?', [projectId]);
    if (result.affectedRows === 0) {
      throw new Error('No project found to delete');
    }
  }
  
module.exports = { getProjects, getProjectDetails, createProject, updateProject, deleteProject };
