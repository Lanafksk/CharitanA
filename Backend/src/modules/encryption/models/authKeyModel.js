const connectDB = require('../../../database/connection');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
const clusterURI = process.env.MONGO_URI;

// Connect to respective Database
const db = connectDB('charitan', clusterURI);

// Define the AuthKey Schema
const authKeySchema = new mongoose.Schema(
    {
        entity_id: {
            unique: true,
            type: String,
            required: true,
        },
        public_key: {
            type: String,
            required: true,
        },
        private_key: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const AuthKey = db.model('AuthKey', authKeySchema);

module.exports = AuthKey;