const videoService = require('./videoService');
const projectService = require('../project/projectService');

// Create a new video
exports.createVideo = async (req, res) => {
    try {
        const { project_id } = req.body;

        // Validate if the project exists
        const projectExists = await projectService.getProjectById(project_id);
        if (!projectExists) {
            return res.status(400).json({ error: 'Invalid project_id. Project does not exist.' });
        }

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
        // Validate if the project exists
        const projectExists = await videoService.validateProject(req.params.id);
        if (!projectExists) {
            return res.status(400).json({ error: 'Invalid project_id. Project does not exist.' });
        }

        const videos = await videoService.getVideosByProjectId(req.params.id);
        res.status(200).json(videos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};