const imageService = require('../services/imageService');
const projectService = require('../services/projectService');

// Create a new image
exports.createImage = async (req, res) => {
    try {
        const { project_id } = req.body;

        // Validate if the project exists
        const projectExists = await projectService.getProjectById(project_id);
        if (!projectExists) {
            return res.status(400).json({ error: 'Invalid project_id. Project does not exist.' });
        }

        const image = await imageService.createImage(req.body);
        res.status(201).json(image);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all images
exports.getAllImages = async (req, res) => {
    try {
        const images = await imageService.getAllImages();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a image by ID
exports.getImageById = async (req, res) => {
    try {
        const image = await imageService.getImageById(req.params.id);
        if (!image) return res.status(404).json({ error: 'Image not found' });
        res.status(200).json(image);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a image
exports.updateImage = async (req, res) => {
    try {
        const image = await imageService.updateImage(req.params.id, req.body);
        if (!image) return res.status(404).json({ error: 'Image not found' });
        res.status(200).json(image);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a image
exports.deleteImage = async (req, res) => {
    try {
        const image = await imageService.deleteImage(req.params.id);
        if (!image) return res.status(404).json({ error: 'Image not found' });
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all images by project ID
exports.getImagesByProjectId = async (req, res) => {
    try {
        // Validate if the project exists
        const projectExists = await imageService.validateProject(req.params.id);
        if (!projectExists) {
            return res.status(400).json({ error: 'Invalid project_id. Project does not exist.' });
        }

        const images = await imageService.getImagesByProjectId(req.params.id);
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};