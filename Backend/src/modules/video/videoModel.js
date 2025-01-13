const { v4: uuidv4 } = require('uuid');
const connectDB = require('../../database/connection');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
const clusterURI = process.env.MONGO_URI;

// Connect to respective Database
const db = connectDB('videoDB', clusterURI);
const videoSchema = new mongoose.Schema(
    {
        video_id: { type: String, default: uuidv4, unique: true },
        project_id: { type: String, ref: 'Project' }, // Reference to Project
        url: { type: String, required: true },
        title: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Video = db.model('Video', videoSchema);

module.exports = Video;
