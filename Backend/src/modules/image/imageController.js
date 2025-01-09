const axios = require('axios');
const imageService = require('./imageService');

// Create a new image
exports.createImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded!' });
        }

        const { project_id } = req.body;

        // Validate if the project exists
        const projectExists = await axios.get(`http://localhost:4000/api/projects/${project_id}`);
        const projectRepsonse = projectExists.data;    
        if (projectRepsonse == null) {
            return res.status(400).json({ error: 'Invalid project_id. Project does not exist.' });
        }

        // Upload image to cloudinary
        req.body.url = req.file.path;
        req.body.format = req.file.mimetype;

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
        const project_id = req.params.id;

        // Validate if the project exists
        const projectExists = await axios.get(`http://localhost:4000/api/projects/${project_id}`);
        const projectRepsonse = projectExists.data;
        
        if (projectRepsonse == null) {
            return res.status(400).json({ error: 'Invalid project_id. Project does not exist.' });
        }

        const images = await imageService.getImagesByProjectId(req.params.id);
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};