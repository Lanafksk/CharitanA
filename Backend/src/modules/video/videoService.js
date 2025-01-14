const videoRepository = require('./videoRepository');


// Create a new video
exports.createVideo = async (videoData) => {
    return await videoRepository.createVideo(videoData);
};

// Get all videos
exports.getAllVideos = async () => {
    return await videoRepository.getAllVideos();
};

// Get a video by ID
exports.getVideoById = async (videoId) => {
    return await videoRepository.getVideoById(videoId);
};

// Update a video
exports.updateVideo = async (videoId, videoData) => {
    return await videoRepository.updateVideo(videoId, videoData);
};

// Delete a video
exports.deleteVideo = async (videoId) => {
    return await videoRepository.deleteVideo(videoId);
};

// Get all videos by project ID
exports.getVideosByProjectId = async (projectId) => {
    return await videoRepository.getVideosByProjectId(projectId);
};