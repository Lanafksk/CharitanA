const projectService = require('./projectService');
const { isValidDate } = require('../../utils/dateValidation');

// Create a new project
exports.createProject = async (req, res) => {
    try {
        const project = await projectService.createProject(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a specific project by ID
exports.getProjectById = async (req, res) => {
    try {
        const project = await projectService.getProjectById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a project
exports.updateProject = async (req, res) => {
    try {
        const project = await projectService.updateProject(req.params.id, req.body);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const project = await projectService.deleteProject(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects by category
exports.getProjectsByCategory = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByCategory(req.params.category);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects by charity
exports.getProjectsByCharityId = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByCharityId(req.params.id);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects by greater or equal to target amount
exports.getProjectsByTargetAmountGte = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByTargetAmountGte(req.params.amount);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects by lesser or equal to target amount
exports.getProjectsByTargetAmountLte = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByTargetAmountLte(req.params.amount);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Sort all projects by target amount in ascending order
exports.sortProjectsByTargetAmountAsc = async (req, res) => {
    try {
        const projects = await projectService.sortProjectsByTargetAmountAsc();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Sort all projects by target amount in descending order
exports.sortProjectsByTargetAmountDesc = async (req, res) => {
    try {
        const projects = await projectService.sortProjectsByTargetAmountDesc();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects by greater or equal to current amount
exports.getProjectsByCurrentAmountGte = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByCurrentAmountGte(req.params.amount);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects by lesser or equal to current amount
exports.getProjectsByCurrentAmountLte = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByCurrentAmountLte(req.params.amount);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Sort all projects by current amount in ascending order
exports.sortProjectsByCurrentAmountAsc = async (req, res) => {
    try {
        const projects = await projectService.sortProjectsByCurrentAmountAsc();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Sort all projects by current amount in descending order
exports.sortProjectsByCurrentAmountDesc = async (req, res) => {
    try {
        const projects = await projectService.sortProjectsByCurrentAmountDesc();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects by status
exports.getProjectsByStatus = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByStatus(req.params.status);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Filter projects by start_date and end_date
exports.filterProjectsByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.params;

        // Validate date format
        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        const projects = await projectService.filterProjectsByDate(req.params.startDate, req.params.endDate);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects by country
exports.getProjectsByCountry = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByCountry(req.params.country);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects by region
exports.getProjectsByRegion = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByRegion(req.params.region);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all projects by keyword
exports.getProjectsByTitle = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByTitle(req.params.title);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get all projects by charity name
exports.getProjectsByCharityName = async (req, res) => {
    try {
        const projects = await projectService.getProjectsByCharityName(req.params.name);
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}