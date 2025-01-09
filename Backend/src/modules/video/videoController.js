const axios = require('axios');
const videoService = require('./videoService');

// Create a new video
exports.createVideo = async (req, res) => {
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
        
        // Upload video to cloudinary
        req.body.url = req.file.path;
        req.body.format = req.file.mimetype;

        const video = await videoService.createVideo(req.body);
        res.status(201).json(video);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all videos
exports.getAllVideos = async (req, res) => {
    try {
        const videos = await videoService.getAllVideos();
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a video by ID
exports.getVideoById = async (req, res) => {
    try {
        const video = await videoService.getVideoById(req.params.id);
        if (!video) return res.status(404).json({ error: 'Video not found' });
        res.status(200).json(video);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a video
exports.updateVideo = async (req, res) => {
    try {
        const video = await videoService.updateVideo(req.params.id, req.body);
        if (!video) return res.status(404).json({ error: 'Video not found' });
        res.status(200).json(video);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
    try {
        const video = await videoService.deleteVideo(req.params.id);
        if (!video) return res.status(404).json({ error: 'Video not found' });
        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all videos by project ID
exports.getVideosByProjectId = async (req, res) => {
    try {
        const project_id = req.params.id;
        
        // Validate if the project exists
        const projectExists = await axios.get(`http://localhost:4000/api/projects/${project_id}`);
        const projectRepsonse = projectExists.data;
        
        if (projectRepsonse == null) {
            return res.status(400).json({ error: 'Invalid project_id. Project does not exist.' });
        }

        const videos = await videoService.getVideosByProjectId(req.params.id);
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};