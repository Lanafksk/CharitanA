const express = require("express");
const donationController = require("../controllers/donationController");
const router = express.Router();

router.post("/", donationController.createDonation); // Create a donation
router.get("/capture", donationController.captureDonation); // Capture a PayPal payment (for one-time donations)
router.get('/subscription/success', donationController.handleSubscriptionSuccess); // Handle successful subscription
router.post('/webhook/paypal', donationController.handlePaypalWebhook); // Handle PayPal webhooks

module.exports = router;
