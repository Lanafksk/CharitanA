const express = require('express');
const router = express.Router();
const projectController = require('./projectController'); // Ensure the correct path

// Define routes

// ==================================
// SECTION: CRUD operations for projects
// ==================================
router.post('/', projectController.createProject); // Create a new project
router.get('/', projectController.getAllProjects); // Get all projects
router.get('/:id', projectController.getProjectById); // Get a specific project
router.put('/:id', projectController.updateProject); // Update a project
router.delete('/:id', projectController.deleteProject); // Delete a project

// ==================================
// SECTION: Default filter options for projects
// ==================================
router.get('/category/:category', projectController.getProjectsByCategory); // Get all projects by category
router.get('/charity/:id', projectController.getProjectsByCharityId); // Get all projects by charity_id
router.get('/status/:status', projectController.getProjectsByStatus); // Get all projects by status
router.get('/from/:startDate/to/:endDate', projectController.filterProjectsByDate); // Get all projects by date range
router.get('/country/:country', projectController.getProjectsByCountry); // Get all projects by country
router.get('/region/:region', projectController.getProjectsByRegion); // Get all projects by region

// ==================================
// SECTION: Filter and sort projects by target amount
// ==================================
router.get('/target-amount/gte/:amount', projectController.getProjectsByTargetAmountGte); // Get all projects by greater or equal to target amount
router.get('/target-amount/lte/:amount', projectController.getProjectsByTargetAmountLte); // Get all projects by lesser or equal to target amount
router.get('/target-amount/asc', projectController.sortProjectsByTargetAmountAsc); // Sort all projects by target amount in ascending order
router.get('/target-amount/desc', projectController.sortProjectsByTargetAmountDesc); // Sort all projects by target amount in descending order

// ==================================
// SECTION: Filter and sort projects by current amount
// ==================================
router.get('/current-amount/gte/:amount', projectController.getProjectsByCurrentAmountGte); // Get all projects by greater or equal to current amount
router.get('/current-amount/lte/:amount', projectController.getProjectsByCurrentAmountLte); // Get all projects by lesser or equal to current amount
router.get('/current-amount/asc', projectController.sortProjectsByCurrentAmountAsc); // Sort all projects by current amount in ascending order
router.get('/current-amount/desc', projectController.sortProjectsByCurrentAmountDesc); // Sort all projects by current amount in descending order

// ==================================
// SECTION: Search projects by keyword
// ==================================
router.get('/title/:title', projectController.getProjectsByTitle); // Search projects by title
router.get('/charity-name/:name', projectController.getProjectsByCharityName); // Search projects by charity name

// ==================================
// SECTION: Retrieve static categories and statuses
// ==================================
router.get('/static/categories', projectController.getProjectCategories); // Get all project categories
router.get('/static/statuses', projectController.getProjectStatuses); // Get all project statuses

module.exports = router;