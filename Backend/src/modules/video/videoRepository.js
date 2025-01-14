const Video = require('./videoModel');

// Create a new video
exports.createVideo = async (videoData) => {
    const video = new Video(videoData);
    return await video.save();
};

// Get all videos
exports.getAllVideos = async () => {
    return await Video.find();
};

// Get a video by ID
exports.getVideoById = async (videoId) => {
    return await Video.findOne({ video_id: videoId});
};

// Update a video
exports.updateVideo = async (videoId, videoData) => {
    return await Video.findOneAndUpdate({ video_id: videoId }, videoData, { new: true });
};

// Delete a video
exports.deleteVideo = async (videoId) => {
    return await Video.findOneAndDelete({ video_id: videoId });
};

// Get all videos by project ID
exports.getVideosByProjectId = async (projectId) => {
    const videos = await Video.find({ project_id: projectId });
    return videos.map(video => [video.url, video.title]);
};