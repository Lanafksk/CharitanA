const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/index'); // Centralized routes
const { redisInstance } = require('./modules/redis/redisConfig');
const { generateProjects } = require('./database/dataGeneration');

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

dotenv.config();

const app = express();

// Connect to Redis
redisInstance.connect()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Backend is running');
});

//Centralized routes
app.use('/api', routes);

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sever running in http://${HOST}:${PORT}`);
});

// Generate Projects
// generateProjects();