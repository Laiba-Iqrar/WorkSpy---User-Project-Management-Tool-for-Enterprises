const { getProjects, getProjectDetails, createProject, updateProject } = require('../models/m_projectsModel');
const { db } = require('../db');  // assuming you are using a db instance
const { deleteProject } = require('../models/m_projectsModel');

async function listProjects(req, res) {
  const userId = req.session.userId;
  const projects = await getProjects(userId);
  res.render('m_projects', { projects });
}

async function projectDetails(req, res) {
  const projectId = req.params.projectId;
  const details = await getProjectDetails(projectId);
  res.render('m_projects/m_projectDetails', { details });
}

async function createNewProject(req, res) {
  const userId = req.session.userId;
  await createProject(req.body, userId);
  res.redirect('/m-projects');
}

async function updateExistingProject(req, res) {
    try {
      const { projectId } = req.params; // Extract project ID
      await updateProject(projectId, req.body); // Call the model function
      res.redirect('/m-projects'); // Redirect to the projects list
    } catch (error) {
      console.error(`Error updating project: ${error.message}`);
      res.status(500).send('Failed to update project');
    }
  }
  
  

async function deleteExistingProject(req, res) {
    const projectId = req.params.projectId; // Use the projectId from the request parameters
    try {
      await deleteProject(projectId);  // Assuming deleteProject handles the deletion
      res.redirect('/m-projects');  // Redirect after successful deletion
    } catch (error) {
      console.error('Error occurred while deleting the project:', error);
      res.status(500).send('An error occurred while deleting the project');
    }
  }
  
  
module.exports = { listProjects, projectDetails, createNewProject, updateExistingProject, deleteExistingProject };
