const axios = require('axios');
const projectRepository = require('./projectRepository');
const categoryRepository = require('../category/categoryRepository');
const videoRepository = require('../video/videoRepository');
const imageRepository = require('../image/imageRepository');

const API_GATEWAY = 'http://localhost:5000/admin-server';

// Validate if the category exists
exports.validateCategory = async (categoryId) => {
    const category = await categoryRepository.getCategoryById(categoryId);
    return !!category; // Return true if category exists, false otherwise
};

// Populate videos and images
populateVideosAndImages = async (projects) => {
    for (let project of projects) {
        project.videos = await videoRepository.getVideosByProjectId(project.project_id);
        project.images = await imageRepository.getImagesByProjectId(project.project_id);
    }

    return projects;
};

// Create a new project
exports.createProject = async (projectData) => {
    return await projectRepository.createProject(projectData);
};

// Get all projects
exports.getAllProjects = async () => {
    const projects = await projectRepository.getAllProjects();

    // Populate videos and images
    return await populateVideosAndImages(projects);

};

// Get a specific project by ID
exports.getProjectById = async (projectId) => {
    const project = await projectRepository.getProjectById(projectId);

    // Populate videos and images
    return await populateVideosAndImages([project]);
};

// Update a project
exports.updateProject = async (projectId, projectData) => {
    return await projectRepository.updateProject(projectId, projectData);
};

// Delete a project
exports.deleteProject = async (projectId) => {
    return await projectRepository.deleteProject(projectId);
};

// Get all projects by category
exports.getProjectsByCategory = async (categoryId) => {
    return await projectRepository.getProjectsByCategory(categoryId);
};

// Get all projects by charity
exports.getProjectsByCharityId = async (charityId) => {
    return await projectRepository.getProjectsByCharityId(charityId);
};

// Get all projects by greater or equal to target amount
exports.getProjectsByTargetAmountGte = async (amount) => {
    return await projectRepository.getProjectsByTargetAmountGte(amount);
};

// Get all projects by lesser or equal to target amount
exports.getProjectsByTargetAmountLte = async (amount) => {
    return await projectRepository.getProjectsByTargetAmountLte(amount);
};

// Sorts all projects by target amount in ascending order
exports.sortProjectsByTargetAmountAsc = async () => {
    return await projectRepository.sortProjectsByTargetAmountAsc();
};

// Sorts all projects by target amount in descending order
exports.sortProjectsByTargetAmountDesc = async () => {
    return await projectRepository.sortProjectsByTargetAmountDesc();
};

// Get all projects by greater or equal to current amount
exports.getProjectsByCurrentAmountGte = async (amount) => {
    return await projectRepository.getProjectsByCurrentAmountGte(amount);
};

// Get all projects by lesser or equal to current amount
exports.getProjectsByCurrentAmountLte = async (amount) => {
    return await projectRepository.getProjectsByCurrentAmountLte(amount);
};

// Sorts all projects by current amount in ascending order
exports.sortProjectsByCurrentAmountAsc = async () => {
    return await projectRepository.sortProjectsByCurrentAmountAsc();
};

// Sorts all projects by current amount in descending order
exports.sortProjectsByCurrentAmountDesc = async () => {
    return await projectRepository.sortProjectsByCurrentAmountDesc();
};

// Get all projects by status
exports.getProjectsByStatus = async (status) => {
    return await projectRepository.getProjectsByStatus(status);
};

// Filter by start_date and end_date
exports.filterProjectsByDate = async (startDate, endDate) => {
    return await projectRepository.filterProjectsByDate(startDate, endDate);
};

// Get all projects by country
exports.getProjectsByCountry = async (country) => {
    return await projectRepository.getProjectsByCountry(country);
};

// Get all projects by region
exports.getProjectsByRegion = async (region) => {
    return await projectRepository.getProjectsByRegion(region);
};

// Get all projects by keyword
exports.getProjectsByTitle = async (title) => {
    return await projectRepository.getProjectsByTitle(title);
};

// Get all projects by charity name
exports.getProjectsByCharityName = async (name) => {
    try {
        const response = await axios.get(`${API_GATEWAY}/charities`);
        const charityData = response.data;

        for (let charity of charityData.charityResponse.data) {
            if (charity.name.includes(name)) {
                return await projectRepository.getProjectsByCharityId(charity.charity_id);
            }
        }
        return [];
    }
    catch (err) {
        console.log(err);
    }
};

/**
 * Get the PayPal email of the charity associated with a project.
 *
 * @param {string} projectId - The ID of the project.
 * @returns {string} - The PayPal email of the charity.
 * @throws {Error} - If the project is not found or if the charity's PayPal email is not available.
 */
exports.getCharityPaypalEmail = async (projectId) => {
    try {
        console.log("Project ID: ", projectId);
        const project = await projectRepository.getProjectById(projectId);
        if (!project) {
            throw new Error(`Project not found with ID: ${projectId}`);
        }

        console.log("Project: ", project);
        const charityId = project.charity_id;
        console.log("Charity ID: ", charityId);
        if (!charityId) {
            throw new Error(`Charity ID not found for project with ID: ${projectId}`);
        }

        // Fetch the charity details from Team B's API
        // Correct the URL by adding "admin-server"
        const charityResponse = await axios.get(
            `http://localhost:5001/admin-server/charity/id/${charityId}`
        );
        console.log("Charity response:", charityResponse);

        const charityData = charityResponse.data;

        // Access the paypal_email property
        const paypalEmail = charityData.data.paypal_email;
        if (!paypalEmail) {
            throw new Error(
                `PayPal email not found for charity with ID: ${charityId}`
            );
        }

        return paypalEmail;
    } catch (error) {
        console.error(
            `Error getting charity PayPal email for project ID ${projectId}:`,
            error
        );
        throw new Error(
            `Failed to get charity PayPal email for project ID ${projectId}`
        );
    }
};