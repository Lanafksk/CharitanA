const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const projectSchema = new mongoose.Schema(
    {
        project_id: { type: String, default: uuidv4, unique: true },
        category_id: { type: String, required: true }, // Reference to Category
        charity_id: { type: String, required: true },
        title: { type: String, required: true },
        target_amount: { type: Number, required: true },
        current_amount: { type: Number, default: 0 },
        description: { type: String, required: true },
        status: { type: String, enum: ['active', 'halted', 'completed'], default: 'active' },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        region: { type: String, required: true },
        country: { type: String, required: true },
        images: [{ type: String, ref: 'Image' }], // Reference to Image
        videos: [{ type: String, ref: 'Video' }], // Reference to Video
    },
    {
        timestamp: true
    }
);

module.exports = mongoose.model('Project', projectSchema);