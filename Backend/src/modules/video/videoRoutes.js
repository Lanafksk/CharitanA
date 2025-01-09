const express = require('express');
const router = express.Router();
const videoController = require('./videoController');
const upload = require('../../database/multerConfig');

// Create a new video
router.post('/', upload.single('video'), videoController.createVideo);

// Get all videos
router.get('/', videoController.getAllVideos);

// Get a specific video
router.get('/:id', videoController.getVideoById);

// Update a video
router.put('/:id', videoController.updateVideo);

// Delete a video
router.delete('/:id', videoController.deleteVideo);

// Get all videos by project ID
router.get('/project/:id', videoController.getVideosByProjectId);

module.exports = router;