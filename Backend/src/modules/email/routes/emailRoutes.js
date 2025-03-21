const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// --- Donation Confirmation Endpoint ---
router.post("/send-donation-confirmation", emailController.sendDonationConfirmation);

// --- Project Creation Confirmation Endpoint ---
router.post("/send-project-creation-confirmation", emailController.sendProjectCreationConfirmation);

// --- Welcome Email for Donors Endpoint ---
router.post("/send-welcome-email-donor", emailController.sendWelcomeEmailDonor);

// --- Welcome Email for Charities Endpoint ---
router.post("/send-welcome-email-charity", emailController.sendWelcomeEmailCharity);

// --- Subscribe Email for Donors Endpoint ---
router.post("/send-project-notification", emailController.sendProjectNotification);

// Reason for halting the project
router.post("/project-halted", emailController.sendProjectHaltedEmail);

module.exports = router;