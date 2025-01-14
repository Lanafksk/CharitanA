const { Project, ProjectCategory, ProjectStatus } = require('./projectModel');
const ProjectDTO = require('./projectDTO');

convertToDTO = (project) => {
    const projectsDTO = [];

    if(Array.isArray(project)) {
        for (let aProject of project) {
            aProject = new ProjectDTO(aProject);
            projectsDTO.push(aProject);
        }
        return projectsDTO;
    }
    else {
        project = new ProjectDTO(project);
        return project;
    }
}

// Create a new project
exports.createProject = async (projectData) => {
    const project = new Project(projectData);
    return await project.save();
};

// Get all projects
exports.getAllProjects = async () => {
    const projects = await Project.find();
    return await convertToDTO(projects);
};

// Get a specific project by ID
exports.getProjectById = async (projectId) => {
    const project = await Project.findOne({ project_id: projectId });
    return await convertToDTO(project);
};

// Update a project
exports.updateProject = async (projectId, projectData) => {
    const project = await Project.findOneAndUpdate({ project_id: projectId }, projectData, { new: true });
    return await convertToDTO(project);
};

// Delete a project
exports.deleteProject = async (projectId) => {
    return await Project.findOneAndDelete({ project_id: projectId });
};

// Get all projects by category
exports.getProjectsByCategory = async (category) => {
    const projects = await Project.find({ category: category });
    return await convertToDTO(projects);
};

// Get all projects by charity
exports.getProjectsByCharityId = async (charityId) => {
    const projects = await Project.find({ charity_id: charityId });
    return await convertToDTO(projects);
};

// Get all projects by greater or equal to target amount 
exports.getProjectsByTargetAmountGte = async (amount) => {
    const projects = await Project.find({ target_amount: { $gte: amount } });
    return await convertToDTO(projects);
};

// Get all projects by lesser or equal to target amount
exports.getProjectsByTargetAmountLte = async (amount) => {
    const projects = await Project.find({ target_amount: { $lte: amount } });
    return await convertToDTO(projects);
};

// Sorts all projects by target amount in ascending order
exports.sortProjectsByTargetAmountAsc = async () => {
    const projects = await Project.find().sort({ target_amount: 1 });
    return await convertToDTO(projects);
};

// Sorts all projects by target amount in descending order
exports.sortProjectsByTargetAmountDesc = async () => {
    const projects = await Project.find().sort({ target_amount: -1 });
    return await convertToDTO(projects);
};

// Get all projects by greater or equal to current amount
exports.getProjectsByCurrentAmountGte = async (amount) => {
    const projects = await Project.find({ current_amount: { $gte: amount } });
    return await convertToDTO(projects);
};

// Get all projects by lesser or equal to current amount
exports.getProjectsByCurrentAmountLte = async (amount) => {
    const projects = await Project.find({ current_amount: { $lte: amount } });
    return await convertToDTO(projects);
};

// Sorts all projects by current amount in ascending order
exports.sortProjectsByCurrentAmountAsc = async () => {
    const projects = await Project.find().sort({ current_amount: 1 });
    return await convertToDTO(projects);
};

// Sorts all projects by current amount in descending order
exports.sortProjectsByCurrentAmountDesc = async () => {
    const projects = await Project.find().sort({ current_amount: -1 });
    return await convertToDTO(projects);
};

// Get all projects by status
exports.getProjectsByStatus = async (status) => {
    const projects = await Project.find({ status: status });
    return await convertToDTO(projects);
}

// Filter by start_date and end_date
exports.filterProjectsByDate = async (startDate, endDate) => {
    const projects = await Project.find({ start_date: { $gte: startDate }, end_date: { $lte: endDate } });
    return await convertToDTO(projects);
};

// Get projects by country
exports.getProjectsByCountry = async (country) => {
    const projects = await Project.find({ country: country });
    return await convertToDTO(projects);
}

// Get projects by region
exports.getProjectsByRegion = async (region) => {
    const projects = await Project.find({ region: region });
    return await convertToDTO(projects);
}

// Get projects by charity name
exports.getProjectsByTitle = async (title) => {

    const projects = await Project.find({ title: { $regex: title, $options: 'i' } });
    return await convertToDTO(projects);
}

// Get static possible project categories
exports.getProjectCategories = async () => {
    return ProjectCategory;
};

// Get static possible project statuses
exports.getProjectStatuses = async () => {
    return ProjectStatus;
};

// Helper function to get project IDs by charity ID
exports.getProjectIdsByCharityId = async (charityId) => {
    const projects = await Project.find({ charity_id: charityId });
    return projects.map((project) => project.project_id);
};