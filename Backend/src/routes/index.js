const express = require('express');
const router = express.Router();

// Import module routes
// Project Module
const projectRoutes = require('../modules/project/projectRoutes');
const categoryRoutes = require('../modules/category/categoryRoutes');
const imageRoutes = require('../modules/image/imageRoutes');
const videoRoutes = require('../modules/video/videoRoutes');
// email Module
const emailRoutes = require('../modules/email/routes/emailRoutes');

// Team A will do these things later
// // encryption Module
// const encryptionRoutes = require('../modules/encryption/routes/encryptionRoutes');
// // Donation Module
// const donationRoutes = require('../modules/donation/routes/donationRoutes');
// // Leaderboard Module
// const leaderboardRoutes = require('../modules/leaderboard/routes/leaderboardRoutes');

// Mount module routes

//Project Module
router.use('/projects', projectRoutes); // Routes for the Project module
router.use('/categories', categoryRoutes); // Routes for the Category module
router.use('/images', imageRoutes); // Routes for the Image module
router.use('/videos', videoRoutes); // Routes for the Video module
//Project Module

router.use('/emails', emailRoutes); // Routes for the Email module
// router.use('/donations', donationRoutes); // Routes for the Donation module
// router.use('/encryption', encryptionRoutes); // Routes for the Encryption module
// router.use('/notifications', notificationRoutes); // Routes for the Notification module
// router.use('/leaderboard', leaderboardRoutes); // Routes for the Leaderboard module

module.exports = router;