const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, // Replace with your Cloudinary cloud name
    api_key: process.env.CLOUD_API_KEY,      // Replace with your Cloudinary API key
    api_secret: process.env.CLOUD_API_SECRET // Replace with your Cloudinary API secret
});

module.exports = cloudinary;