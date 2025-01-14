const imageRepository = require('./imageRepository');
const projectRepository = require('../project/projectRepository');

// Validate if the project exists
exports.validateProject = async (projectId) => {
    const project = await projectRepository.getProjectById(projectId);
    return !!project; // Return true if project exists, false otherwise
};

// Create a new image
exports.createImage = async (imageData) => {
    return await imageRepository.createImage(imageData);
};

// Get all images
exports.getAllImages = async () => {
    return await imageRepository.getAllImages();
};

// Get a image by ID
exports.getImageById = async (imageId) => {
    return await imageRepository.getImageById(imageId);
};

// Update a image
exports.updateImage = async (imageId, imageData) => {
    return await imageRepository.updateImage(imageId, imageData);
};

// Delete a image
exports.deleteImage = async (imageId) => {
    return await imageRepository.deleteImage(imageId);
};

// Get all images by project ID
exports.getImagesByProjectId = async (projectId) => {
    return await imageRepository.getImagesByProjectId(projectId);
};