const { v4: uuidv4 } = require('uuid');
const connectDB = require('../../database/connection');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
const clusterURI = process.env.MONGO_URI;

// Connect to respective Database
const db = connectDB('charitan', clusterURI);

const categorySchema = new mongoose.Schema(
    {
        category_id: { type: String, default: uuidv4, unique: true }, // Automatically generate UUID
        name: {
            type: String,
            enum: ['Food', 'Health', 'Education', 'Environment', 'Religion', 'Humanitarian', 'Housing', 'Other'],
            required: true,
        },
        description: { type: String, required: true },

    },
    {
        timestamps: true
    }
);
const Category = db.model('Category', categorySchema);

module.exports = Category;