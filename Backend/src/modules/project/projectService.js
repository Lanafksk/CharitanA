require('dotenv').config();

const axios = require('axios');
const isValidDate = require('../../utils/dateValidation').isValidDate;
const { ProjectCategory, ProjectStatus } = require('./projectModel');
const projectRepository = require('./projectRepository');
const { cacheProject: cacheProject, returnCacheProject, deleteCacheProject } = require('../redis/redisService');

const API_GATEWAY = process.env.INTERNAL_API_GATEWAY;

let cached_project_ids = [];
let cached_project_count = 0;

// Create a new project
exports.createProject = async (project_data) => {
    // Validate all passed fields
    try {
        await validateProjectData(project_data, true);
    } catch (err) {
        throw new Error(err);
    }

    cacheProject(project_data);
    cached_project_ids.push(project_data.project_id);
    cached_project_count++;


    // Confirmation of data validation, and send email to donors: TEMPORARY
    return await projectRepository.createProject(project_data);

    // Send email to donors
    // const callEmailService = async () => {
    //     try {
    //         await axios.post(`/email`, {
    //             email: '
};

// Get all projects
exports.getAllProjects = async () => {
    // Check if the projects are already cached
    if (cached_project_count > 0) {
        for (let project_id of cached_project_ids) {
            const cached_project = await returnCacheProject(project_id);
            if (!cached_project) {
                break;
            }
        }
    }

    // Get all projects from the database
    const projects = await projectRepository.getAllProjects();
    cached_project_count = projects.length;

    console.log('Project count:', cached_project_count);

    // Cache all projects (if not already cached)
    for (let project of projects) {
        console.log('Project:', project.project_id);
        const cached_project = await returnCacheProject(project.project_id);
        if (cached_project == null) {
            console.log('Caching project:', project.project_id);
            cacheProject(project);
            cached_project_ids.push(project.project_id);
        }
    }

    return projects;
};

// Get a specific project by ID
exports.getProjectById = async (project_id) => {
    // Check if the project is already cached
    const cached_project = await cacheProject(project_id);
    if (cached_project) {
        return cached_project;
    }

    // Get the project from the database and cache
    const project = await projectRepository.getProjectById(project_id);
    cacheProject(project);

    return project;
};

// Update a project
exports.updateProject = async (project_id, project_data) => {
    const project = await projectRepository.getProjectById(project_id);
    project_data = { ...project, ...project_data };

    console.log('Project data:', project_data);

    try {
        validateProjectData(project_data);
    } catch (err) {
        throw new Error(err);
    }

    const result_dto = await projectRepository.updateProject(project_id, project_data);
    await cacheProject(result_dto);

    return await returnCacheProject(result_dto.project_id);
};

// Delete a project
exports.deleteProject = async (project_id) => {
    await deleteCacheProject(project_id);
    cached_project_ids = cached_project_ids.filter(id => id !== project_id);
    return await projectRepository.deleteProject(project_id);
};

// Get all projects by category
exports.getProjectsByCategory = async (category) => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            if (cached_project.category === category) {
                results.push(cached_project);
            }
        }
        return results;
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.getProjectsByCategory(category);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis for category: ${category}`);
    }

    return projects; // Return MongoDB result
};

// Get all projects by charity
exports.getProjectsByCharityId = async (charityId) => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            if (cached_project.charity_id === charityId) {
                results.push(cached_project);
            }
        }
        return results;
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.getProjectsByCharityId(charityId);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis for charityId: ${charityId}`);
    }

    return projects; // Return MongoDB result
};

// Get all projects by greater or equal to target amount
exports.getProjectsByTargetAmountGte = async (amount) => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            if (cached_project.target_amount > amount) {
                results.push(cached_project);
            }
        }
        return results;
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.getProjectsByTargetAmountGte(amount);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis for amount: ${amount}`);
    }

    return projects; // Return MongoDB result
};

// Get all projects by lesser or equal to target amount
exports.getProjectsByTargetAmountLte = async (amount) => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            if (cached_project.target_amount < amount) {
                results.push(cached_project);
            }
        }
        return results;
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.getProjectsByTargetAmountLte(amount);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis for amount: ${amount}`);
    }

    return projects; // Return MongoDB result
};

// Sorts all projects by target amount in ascending order
exports.sortProjectsByTargetAmountAsc = async () => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            results.push(cached_project);
        }
        return results.sort((a, b) => a.target_amount - b.target_amount);
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.sortProjectsByTargetAmountAsc();

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis`);
    }

    return projects; // Return MongoDB result
};

// Sorts all projects by target amount in descending order
exports.sortProjectsByTargetAmountDesc = async () => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            results.push(cached_project);
        }
        return results.sort((a, b) => b.target_amount - a.target_amount);
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.sortProjectsByTargetAmountDesc();

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis`);
    }

    return projects; // Return MongoDB result
};

// Get all projects by greater or equal to current amount
exports.getProjectsByCurrentAmountGte = async (amount) => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            if (cached_project.current_amount > amount) {
                results.push(cached_project);
            }
        }
        return results;
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.getProjectsByCurrentAmountGte(amount);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis for amount: ${amount}`);
    }

    return projects; // Return MongoDB result
};

// Get all projects by lesser or equal to current amount
exports.getProjectsByCurrentAmountLte = async (amount) => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            if (cached_project.current_amount < amount) {
                results.push(cached_project);
            }
        }
        return results;
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.getProjectsByCurrentAmountLte(amount);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis for amount: ${amount}`);
    }

    return projects; // Return MongoDB result
};

// Sorts all projects by current amount in ascending order
exports.sortProjectsByCurrentAmountAsc = async () => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            results.push(cached_project);
        }
        return results.sort((a, b) => a.current_amount - b.current_amount);
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.sortProjectsByCurrentAmountAsc();

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis`);
    }

    return projects; // Return MongoDB result
};

// Sorts all projects by current amount in descending order
exports.sortProjectsByCurrentAmountDesc = async () => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            results.push(cached_project);
        }
        return results.sort((a, b) => b.current_amount - a.current_amount);
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.sortProjectsByCurrentAmountDesc();

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis`);
    }

    return projects; // Return MongoDB result
};

// Get all projects by status
exports.getProjectsByStatus = async (status) => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            if (cached_project.status === status) {
                results.push(cached_project);
            }
        }
        return results;
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.getProjectsByStatus(status);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis for status: ${status}`);
    }

    return projects; // Return MongoDB result
};

// Filter by start_date and end_date
exports.filterProjectsByDate = async (start_date, end_date) => {
    let results = [];

    // Step 1: Check if projects are cached in Redis
    if (cached_project_ids.length > 0) {
        for (let project_id of cached_project_ids) {
            const cached_project = await returnCacheProject(project_id); // Retrieve project from Redis
            if (cached_project) {
                // Parse the project's date to check if it falls within the range
                if (new Date(cached_project.start_date) >= new Date(start_date) && new Date(cached_project.end_date) <= new Date(end_date)) {
                    results.push(cached_project);
                }
            }
        }

        // If results are found in cache, return the filtered projects
        if (results.length > 0) {
            return results;
        }
    }

    // Step 2: If no matching data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.filterProjectsByDate(start_date, end_date);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log('Data cached in Redis for date range.');
    }

    return projects; // Return the MongoDB result
};

// Get all projects by country
exports.getProjectsByCountry = async (country) => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            if (cached_project.country === country) {
                results.push(cached_project);
            }
        }
        return results;
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.getProjectsByCountry(country);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis for country: ${country}`);
    }

    return projects; // Return MongoDB result
};

// Get all projects by region
exports.getProjectsByRegion = async (region) => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            if (cached_project.region === region) {
                results.push(cached_project);
            }
        }
        return results;
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.getProjectsByRegion(region);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis for region: ${region}`);
    }

    return projects; // Return MongoDB result
};

// Get all projects by keyword
exports.getProjectsByTitle = async (title) => {
    let results = [];

    if (cached_project_ids.length > 0) {
        for (let project of cached_project_ids) {
            const cached_project = await returnCacheProject(project);
            if (cached_project.title === title) {
                results.push(cached_project);
            }
        }
        return results;
    }

    // Step 2: If no data in Redis, fetch from MongoDB
    console.log('Fetching data from MongoDB...');
    const projects = await projectRepository.getProjectsByTitle(title);

    // Step 3: Cache each project in Redis for future use
    if (projects && projects.length > 0) {
        for (const project of projects) {
            await cacheProject(project); // Cache each project with expiration
        }
        console.log(`Data cached in Redis for title: ${title}`);
    }

    return projects; // Return MongoDB result
};

// Get all projects by charity name
exports.getProjectsByCharityName = async (name) => {
    try {
        let results = [];
        let matched_charity_ids = [];
        const response = await axios.get(`${API_GATEWAY}/charities`);
        const charity_data = response.data;

        for (let charity of charityData.charityResponse.data) {
            if (charity.name.includes(name)) {
                matched_charity_ids.push(charity.charity_id);
            }
        }

        if (cached_project_ids.length > 0) {
            for (let project of cached_project_ids) {
                const cached_project = await returnCacheProject(project);
                if (matched_charity_ids.includes(cached_project.charity_id)) {
                    results.push(cached_project);
                }
            }
        } else {
            // Step 2: If no data in Redis, fetch from MongoDB
            for (let charity_id of matched_charity_ids) {
                const matched_project = await projectRepository.getProjectsByCharityId(charity_id);
                results.push(matched_project);
                cacheProject(matched_project);
            }
        }

        return results;
    }
    catch (err) {
        console.log(err);
    }
};


async function validateProjectData(project_data) {
    if (project_data.title == null || project_data.description == null || project_data.target_amount == null || project_data.current_amount == null || project_data.start_date == null || project_data.end_date == null || project_data.country == null || project_data.region == null || project_data.category == null || project_data.charity_id == null) {
        throw new Error('All fields are required, missing: ' + Object.keys(project_data));
    }

    // Validate if the charity exists
    try {
        const response = await axios.get(`${API_GATEWAY}/charity/${project_data.charity_id}`);
        const charityData = response.data;
        if (charityData == null) {
            throw new Error('Charity does not exist');
        }
    }
    catch (err) {
        console.log(err);
    }

    // Validate if the category exists
    if (!ProjectCategory.includes(project_data.category)) {
        throw new Error('Invalid category');
    }

    // Validate if status is valid
    if (!ProjectStatus.includes(project_data.status)) {
        throw new Error('Invalid status');
    }

    // Validate date
    if (!isValidDate(project_data.start_date) || !isValidDate(project_data.end_date)) {
        throw new Error('Invalid date');
    }

    // Validate target amount
    if (project_data.target_amount < 0) {
        throw new Error('Target amount must be greater than 0');
    }
};

// Get all project categories
exports.getProjectCategories = async () => {
    const categories = await projectRepository.getProjectCategories();
    return categories;
};

// Get all project statuses
exports.getProjectStatuses = async () => {
    const statuses = await projectRepository.getProjectStatuses();
    return statuses;

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

        // Get the charity's PayPal email
        // paypalEmail = "sb-vmtlt35454936@business.example.com"
        const charityResponse = await axios.get(
            `${API_GATEWAY}/charity/id/${charityId}`,
            {
                headers: {
                    'internal-api': process.env.INTERNAL_API_KEY
                }
            }
        );

        console.log("Charity response:", charityResponse);

        const charityData = charityResponse.data;

        // Ensure the response contains data
        if (!charityData || !charityData.data) {
            throw new Error(`Invalid response structure for charity with ID: ${charityId}`);
        }

        // Access the paypal_email property
        const paypalEmail = charityData.data.paypal_email;
        if (!paypalEmail) {
            throw new Error(`PayPal email not found for charity with ID: ${charityId}`);
        }

        // Proceed with using paypalEmail
        console.log("PayPal Email:", paypalEmail);

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

// Set new current amount for a project upon donation completion
exports.updateCurrentAmount = async (project_id, amount) => {
    const project = await projectRepository.getProjectById(project_id);
    const new_current_amount = project.current_amount + amount;
    const project_data = { ...project, current_amount: new_current_amount };

    return await projectRepository.updateProject(project_id, project_data);
};