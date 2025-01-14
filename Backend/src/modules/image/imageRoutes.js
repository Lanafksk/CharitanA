const express = require('express');
const router = express.Router();
const imageController = require('./imageController');
const upload = require('../../database/multerConfig');

// Create a new image
router.post('/upload', upload.single('image'), imageController.createImage);

// Get all images
router.get('/', imageController.getAllImages);

// Get a specific image
router.get('/:id', imageController.getImageById);

// Update a image
router.put('/:id', imageController.updateImage);

// Delete a image
router.delete('/:id', imageController.deleteImage);

// Get all images by project ID
router.get('/project/:id', imageController.getImagesByProjectId);

module.exports = router;