const { getProjects, getProjectDetails, createProject, updateProject } = require('../models/m_projectsModel');
const { db } = require('../db');  // assuming you are using a db instance
const { deleteProject } = require('../models/m_projectsModel');
const fs = require('fs');
const path = require('path');

function logError(error, action) {
  const logMessage = `${new Date().toISOString()} - Action: ${action} - Error: ${error.message}\n${error.stack}\n`;
  fs.appendFileSync(path.join(__dirname, 'error_logs.txt'), logMessage);
}

// Function to log successful actions (optional, for completeness)
function logSuccess(action, message) {
  const logMessage = `${new Date().toISOString()} - Action: ${action} - Success: ${message}\n`;
  fs.appendFileSync(path.join(__dirname, 'action_logs.txt'), logMessage);
}

async function listProjects(req, res) {
  const userId = req.session.userId;
  try {
    const projects = await getProjects(userId);
    logSuccess('listProjects', `Successfully retrieved projects for user: ${userId}`);
    res.render('m_projects', { projects });
  } catch (error) {
    logError(error, 'listProjects');
    res.status(500).send('Failed to load projects');
  }
}

async function projectDetails(req, res) {
  const projectId = req.params.projectId;
  try {
    const details = await getProjectDetails(projectId);
    logSuccess('projectDetails', `Successfully retrieved details for project: ${projectId}`);
    res.render('m_projects/m_projectDetails', { details });
  } catch (error) {
    logError(error, 'projectDetails');
    res.status(500).send('Failed to load project details');
  }
}

async function createNewProject(req, res) {
  const userId = req.session.userId;
  try {
    await createProject(req.body, userId);
    logSuccess('createNewProject', `Successfully created a new project for user: ${userId}`);
    res.redirect('/m-projects');
  } catch (error) {
    logError(error, 'createNewProject');
    res.status(500).send('Failed to create project');
  }
}

async function updateExistingProject(req, res) {
  try {
    const { projectId } = req.params;
    await updateProject(projectId, req.body);
    logSuccess('updateExistingProject', `Successfully updated project: ${projectId}`);
    res.redirect('/m-projects');
  } catch (error) {
    logError(error, 'updateExistingProject');
    console.error(`Error updating project: ${error.message}`);
    res.status(500).send('Failed to update project');
  }
}

async function deleteExistingProject(req, res) {
  const projectId = req.params.projectId;
  try {
    await deleteProject(projectId);
    logSuccess('deleteExistingProject', `Successfully deleted project: ${projectId}`);
    res.redirect('/m-projects');
  } catch (error) {
    logError(error, 'deleteExistingProject');
    console.error('Error occurred while deleting the project:', error);
    res.status(500).send('An error occurred while deleting the project');
  }
}

module.exports = { listProjects, projectDetails, createNewProject, updateExistingProject, deleteExistingProject };
