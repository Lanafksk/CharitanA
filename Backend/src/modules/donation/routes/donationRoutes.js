const express = require("express");
const donationController = require("../controllers/donationController");

const router = express.Router();

router.post("/", donationController.createDonation); // Create a donation
router.get("/capture", donationController.captureDonation); // Capture a PayPal payment

module.exports = router;
