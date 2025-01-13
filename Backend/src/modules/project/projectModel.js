const { v4: uuidv4 } = require('uuid');
const connectDB = require('../../database/connection');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
const clusterURI = process.env.MONGO_URI;

// Connect to respective Database
const db = connectDB('projectDB', clusterURI);

const ProjectCategory = ['Food', 'Health', 'Education', 'Environment', 'Religion', 'Humanitarian', 'Housing', 'Other'];
const ProjectStatus = ['Active', 'Halted', 'Completed'];

const projectSchema = new mongoose.Schema(
    {
        project_id: { type: String, default: uuidv4, unique: true },
        category: { type: String, 
            enum: ProjectCategory,
            required: true },
        charity_id: { type: String, required: true },
        title: { type: String, required: true },
        target_amount: { type: Number, required: true },
        current_amount: { type: Number, default: 0 },
        description: { type: String, required: true },
        status: { type: String, enum: ProjectStatus, default: 'active' },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
        region: { type: String, required: true },
        country: { type: String, required: true }
    },
    {
        timestamp: true
    }
);

const Project = db.model('Project', projectSchema);
module.exports = { Project, ProjectCategory, ProjectStatus };