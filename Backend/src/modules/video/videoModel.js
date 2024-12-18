const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const videoSchema = new mongoose.Schema(
    {
        video_id: { type: String, default: uuidv4, unique: true },
        project_id: { type: String, ref: 'Project' }, // Reference to Project
        url: { type: String, required: true },
        title: { type: String, required: true }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Video', videoSchema);