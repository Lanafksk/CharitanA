const axios = require('axios');
const isValidDate = require('../../utils/dateValidation').isValidDate;
const { ProjectCategory, ProjectStatus } = require('./projectModel');
const projectRepository = require('./projectRepository');

const API_GATEWAY = 'http://localhost:5000/admin-server';

// Create a new project
exports.createProject = async (projectData) => {
    // Validate all passed fields
    try {
        await validateProjectData(projectData);
    }catch (err) {
        throw new Error(err);
    }

    // Confirmation of data validation, and send email to donors
    return await projectRepository.createProject(projectData);

    // Send email to donors
    // const callEmailService = async () => {
    //     try {
    //         await axios.post(`/email`, {
    //             email: '
};

// Get all projects
exports.getAllProjects = async () => {
    const projects = await projectRepository.getAllProjects();
    return projects;
};

// Get a specific project by ID
exports.getProjectById = async (projectId) => {
    const project = await projectRepository.getProjectById(projectId);

    // Populate videos and images
    return project;
};

// Update a project
exports.updateProject = async (projectId, projectData) => {
    const validation = validateProjectData(projectData);
    if (!validation) {
        throw new Error(validation);
    }

    return await projectRepository.updateProject(projectId, projectData);
};

// Delete a project
exports.deleteProject = async (projectId) => {
    return await projectRepository.deleteProject(projectId);
};

// Get all projects by category
exports.getProjectsByCategory = async (category) => {
    return await projectRepository.getProjectsByCategory(category);
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

async function validateProjectData(projectData) {
    if (!projectData.title || !projectData.description || !projectData.target_amount || !projectData.current_amount || !projectData.start_date || !projectData.end_date || !projectData.country || !projectData.region || !projectData.category || !projectData.charity_id) {
        throw new Error('All fields are required');
    }

    // Validate if the charity exists
    // try {
    //     const response = await axios.get(`${API_GATEWAY}/charity/${projectData.charity_id}`);
    //     const charityData = response.data;
    //     if (charityData == null) {
    //         throw new Error('Charity does not exist');
    //     }
    // }
    // catch (err) {
    //     console.log(err);
    // }

    // Validate if the category exists
    if (!ProjectCategory.includes(projectData.category)) {
        throw new Error('Invalid category');
    }

    // Validate if status is valid
    if (projectData.status !== 'Active') {
        throw new Error('Invalid status, newly created projects must be Active');
    }

    // Validate date
    if (!isValidDate(projectData.start_date) || !isValidDate(projectData.end_date)) {
        throw new Error('Invalid date');
    }

    // Validate target amount
    if (projectData.target_amount < 0) {
        throw new Error('Target amount must be greater than 0');
    }
};