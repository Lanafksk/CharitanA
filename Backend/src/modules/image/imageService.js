const imageRepository = require('./imageRepository');

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