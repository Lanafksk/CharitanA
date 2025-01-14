const Image = require('./imageModel');

// Create a new image
exports.createImage = async (imageData) => {
    const image = new Image(imageData);
    return await image.save();
};

// Get all images
exports.getAllImages = async () => {
    return await Image.find();
};

// Get a image by image_id
exports.getImageById = async (imageId) => {
    return await Image.findOne({ image_id: imageId });
};

// Update a image
exports.updateImage = async (imageId, imageData) => {
    return await Image.findOneAndUpdate({ image_id: imageId }, imageData, { new: true });
};

// Delete a image
exports.deleteImage = async (imageId) => {
    return await Image.findOneAndDelete({ image_id: imageId });
};

// Get all images by project ID
exports.getImagesByProjectId = async (projectId) => {
    return await Image.find({ project_id: projectId });
};