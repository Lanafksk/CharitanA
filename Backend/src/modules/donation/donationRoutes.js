const express = require("express");
const donationController = require("./donationController");
const router = express.Router();


// Get all donations (with optional sorting)
router.get("/", donationController.getAllDonations);
// GET /donations?sortBy=amount&sortOrder=desc
// GET /donations?sortBy=createdAt&sortOrder=asc

// Get a donation by ID
router.get("/:donationId", donationController.getDonationById);

// Get donation history for a specific donor
router.get("/history/:donorId", donationController.getDonationHistoryByDonor);

// Get the total donation amount for a specific donor
router.get(
    "/total-amount/:donorId", donationController.getTotalDonationAmountByDonor
);

// Get the total number of projects a donor has participated in
router.get(
    "/total-projects/:donorId", donationController.getTotalProjectsParticipatedByDonor
);

// Get a list of donors with their total donation amounts (for leaderboard)
router.get("/leaderboard", donationController.getLeaderboard);

module.exports = router;