const express = require("express");
const donationController = require("../controllers/donationController");
const router = express.Router();

// Get
router.get("/capture", donationController.captureDonation); // Capture a PayPal payment (for one-time donations)
router.get('/subscription/success', donationController.handleSubscriptionSuccess); // Handle successful subscription
router.get('/:id', donationController.getDonationById); // Get a specific donation by ID
router.get('/history/:donorId', donationController.getDonationHistoryByDonor); // Get donation history for a specific donor
router.get('/total-amount/:donorId', donationController.getTotalDonationAmountByDonor); // Get the total donation amount for a specific donor
router.get('/total-projects/:donorId', donationController.getTotalProjectsParticipatedByDonor); // Get the total number of projects a donor has participated in
router.get('/leaderboard', donationController.getLeaderboard); // Get a list of donors with their total donation amounts (for leaderboard)

// Post
router.post('/webhook/paypal', donationController.handlePaypalWebhook); // Handle PayPal webhooks
router.post("/", donationController.createDonation); // Create a donation

module.exports = router;