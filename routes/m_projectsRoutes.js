const express = require('express');
const {
  listProjects,
  projectDetails,
  createNewProject,
  updateExistingProject,
  deleteExistingProject,
} = require('../Controllers/m_projectsController');
const { getProjectDetails } = require('../models/m_projectsModel');

const router = express.Router();

// Render all projects
router.get('/', listProjects);

// Render "Create New Project" form
router.get('/new', (req, res) => {
  res.render('m_projects/new-project', { title: 'Create New Project' });
});

// Handle new project creation
router.post('/', createNewProject);

// Render project details
router.get('/details/:projectId', projectDetails);

router.get('/edit/:projectId', async (req, res) => {
    try {
      const { projectId } = req.params; // Extract projectId from the URL params
  
      // Call the controller function to fetch project details
      const details = await getProjectDetails(projectId); // Use the model directly or adjust the controller
      if (!details) {
        throw new Error(`Project with ID ${projectId} not found`);
      }
  
      // Render the edit project form with fetched details
      res.render('m_projects/edit-project', {
        title: 'Edit Project',
        project: details,
      });
    } catch (error) {
      console.error(`Error loading the edit project page: ${error.message}`);
      res.status(500).send('Error loading the edit project page');
    }
  });

router.post('/edit/:projectId', async (req, res) => {
    try {
      await updateExistingProject(req, res);
    } catch (error) {
      console.error(`Error updating project: ${error.message}`);
      res.status(500).send('Error updating the project');
    }
});

router.post('/delete/:projectId', async (req, res) => {
    const { projectId } = req.params;  // Capture the project ID from the URL
    try {
      await deleteExistingProject(req, res); // Call the controller function to delete
    } catch (error) {
      console.error('Error in route while deleting project:', error);
      res.status(500).send('An error occurred while deleting the project');
    }
  });

module.exports = router;
