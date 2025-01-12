const express = require("express");
const donationController = require("./donationController");
const router = express.Router();

// Get all donations (with optional sorting)
router.get("/", donationController.getAllDonations);

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
    "/total-projects/:donorId",
    donationController.getTotalProjectsParticipatedByDonor
);

// Get a list of donors with their total donation amounts (for leaderboard)
router.get("/get/leaderboard", donationController.getLeaderboard);

// GET total donations for a project
router.get('/total-amount/project/:projectId', donationController.getTotalDonationsForProject);

// GET donations list (objects) for a charity (have sorting options)
router.get('/charity/donations/:charityId/', donationController.getDonationsByCharityId);
// GET number of donations for a project (have sorting options)
router.get('/charity/project-count/:charityId/', donationController.getProjectCountByCharityId);
// GET total donation amount for a charity (have sorting options)
router.get('/charity/total-donations/:charityId', donationController.getTotalDonationAmountByCharityId);

module.exports = router;