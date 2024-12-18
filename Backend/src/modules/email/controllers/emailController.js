const { validationResult } = require('express-validator');
const mailerSendService = require("../services/mailerSendService");

class EmailController {
    async sendDonationConfirmation(req, res) {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { to, donationData } = req.body;
            const result = await mailerSendService.sendDonationConfirmation(to, donationData);
            if (result.success) {
                res.status(200).json({ message: "Donation confirmation email sent!", messageId: result.messageId });
            } else {
                res.status(500).json({ error: "Failed to send donation confirmation email", details: result.error });
            }
        } catch (error) {
            console.error(error); // Replace with structured logger
            res.status(500).json({ error: "Internal server error" });
        }
    }

    async sendProjectCreationConfirmation(req, res) {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { to, projectData } = req.body;
            const result = await mailerSendService.sendProjectCreationConfirmation(to, projectData);
            if (result.success) {
                res.status(200).json({ message: "Project creation confirmation email sent!", messageId: result.messageId });
            } else {
                res.status(500).json({ error: "Failed to send project creation confirmation email", details: result.error });
            }
        } catch (error) {
            console.error(error); // Replace with structured logger
            res.status(500).json({ error: "Internal server error" });
        }
    }

    // --- Welcome Email for Donors Endpoint --
    async sendWelcomeEmailDonor(req, res) {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { to, donorData } = req.body;
            const result = await mailerSendService.sendWelcomeEmailDonor(to, donorData);
            if (result.success) {
                res.status(200).json({ message: "Welcome email for donor sent!", messageId: result.messageId });
            } else {
                res.status(500).json({ error: "Failed to send welcome email for donor", details: result.error });
            }
        } catch (error) {
            console.error(error); // Replace with structured logger
            res.status(500).json({ error: "Internal server error" });
        }
    }

    // --- Welcome Email for Charities Endpoint --
    async sendWelcomeEmailCharity(req, res) {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { to, charityData } = req.body;
            const result = await mailerSendService.sendWelcomeEmailCharity(to, charityData);
            if (result.success) {
                res.status(200).json({ message: "Welcome email for charity sent!", messageId: result.messageId });
            } else {
                res.status(500).json({ error: "Failed to send welcome email for charity", details: result.error });
            }
        } catch (error) {
            console.error(error); // Replace with structured logger
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = new EmailController();
