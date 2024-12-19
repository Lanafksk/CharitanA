const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

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

module.exports = mongoose.model('Category', categorySchema);