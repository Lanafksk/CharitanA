// multerConfig.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig'); // Cloudinary config

// Configure Cloudinary Storage with Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        let folder = 'uploads';
        let allowedFormats = [];
        let resourceType = 'auto'; // Default is 'auto' (both image and video)

        // Set different configurations for image and video
        if (file.mimetype.startsWith('image/')) {
            folder = 'uploads/images';
            allowedFormats = ['jpg', 'png', 'jpeg', 'gif'];
            resourceType = 'image'; // Set resource type to image for image uploads
        } else if (file.mimetype.startsWith('video/')) {
            folder = 'uploads/videos';
            allowedFormats = ['mp4', 'avi', 'mov', 'wmv'];
            resourceType = 'video'; // Set resource type to video for video uploads
        }

        return {
            folder: folder, // Folder in Cloudinary
            allowed_formats: allowedFormats, // Allowed formats for the specific file type
            resource_type: resourceType, // Set resource type (image or video)
            public_id: `media_${Date.now()}`, // Public ID for uniqueness
        };
    },
});

// Initialize Multer with Cloudinary Storage
const upload = multer({ storage });

module.exports = upload;
