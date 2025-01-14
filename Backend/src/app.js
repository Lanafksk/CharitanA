const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/index'); // Centralized routes
const EXTERNAL_HOST = process.env.EXTERNAL_HOST || HOST; // Use EXTERNAL_HOST if defined, otherwise fall back to HOST


const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Backend is running');
});

//Centralized routes
app.use('/api', routes);

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sever running in http://${HOST}:${PORT}`);
    console.log(`Sever running in http://${EXTERNAL_HOST}:${PORT}`);
});