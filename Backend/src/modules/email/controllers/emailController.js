// src/modules/email/controllers/emailController.js

const { validationResult } = require('express-validator'); // For input validation
const mailerSendService = require("../services/mailerSendService");
const logger = require('../utils/logger'); // Import the logger

class EmailController {
    /**
     * Sends a donation confirmation email to the donor.
     * Route: POST /api/emails/send-donation-confirmation
     */
    async sendDonationConfirmation(req, res) {
        // Validate the incoming request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validation failed for sendDonationConfirmation', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { to, donationData } = req.body;
            const result = await mailerSendService.sendDonationConfirmation(to, donationData);

            if (result.success) {
                logger.info('Donation confirmation email sent successfully', { messageId: result.messageId, to });
                res.status(200).json({ message: "Donation confirmation email sent!", messageId: result.messageId });
            } else {
                logger.error('Failed to send donation confirmation email', { error: result.error, to });
                res.status(500).json({ error: "Failed to send donation confirmation email", details: result.error });
            }
        } catch (error) {
            logger.error('Internal server error in sendDonationConfirmation', { error: error.message });
            res.status(500).json({ error: "Internal server error" });
        }
    }

    /**
     * Sends a project creation confirmation email to the charity.
     * Route: POST /api/emails/send-project-creation-confirmation
     */
    async sendProjectCreationConfirmation(req, res) {
        // Validate the incoming request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validation failed for sendProjectCreationConfirmation', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { to, projectData } = req.body;
            const result = await mailerSendService.sendProjectCreationConfirmation(to, projectData);

            if (result.success) {
                logger.info('Project creation confirmation email sent successfully', { messageId: result.messageId, to });
                res.status(200).json({ message: "Project creation confirmation email sent!", messageId: result.messageId });
            } else {
                logger.error('Failed to send project creation confirmation email', { error: result.error, to });
                res.status(500).json({ error: "Failed to send project creation confirmation email", details: result.error });
            }
        } catch (error) {
            logger.error('Internal server error in sendProjectCreationConfirmation', { error: error.message });
            res.status(500).json({ error: "Internal server error" });
        }
    }

    /**
     * Sends a welcome email to a new donor.
     * Route: POST /api/emails/send-welcome-email-donor
     */
    async sendWelcomeEmailDonor(req, res) {
        // Validate the incoming request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validation failed for sendWelcomeEmailDonor', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { to, donorData } = req.body;
            const result = await mailerSendService.sendWelcomeEmailDonor(to, donorData);

            if (result.success) {
                logger.info('Welcome email for donor sent successfully', { messageId: result.messageId, to });
                res.status(200).json({ message: "Welcome email for donor sent!", messageId: result.messageId });
            } else {
                logger.error('Failed to send welcome email for donor', { error: result.error, to });
                res.status(500).json({ error: "Failed to send welcome email for donor", details: result.error });
            }
        } catch (error) {
            logger.error('Internal server error in sendWelcomeEmailDonor', { error: error.message });
            res.status(500).json({ error: "Internal server error" });
        }
    }

    /**
     * Sends a welcome email to a new charity.
     * Route: POST /api/emails/send-welcome-email-charity
     */
    async sendWelcomeEmailCharity(req, res) {
        // Validate the incoming request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            logger.warn('Validation failed for sendWelcomeEmailCharity', { errors: errors.array() });
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { to, charityData } = req.body;
            const result = await mailerSendService.sendWelcomeEmailCharity(to, charityData);

            if (result.success) {
                logger.info('Welcome email for charity sent successfully', { messageId: result.messageId, to });
                res.status(200).json({ message: "Welcome email for charity sent!", messageId: result.messageId });
            } else {
                logger.error('Failed to send welcome email for charity', { error: result.error, to });
                res.status(500).json({ error: "Failed to send welcome email for charity", details: result.error });
            }
        } catch (error) {
            logger.error('Internal server error in sendWelcomeEmailCharity', { error: error.message });
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

module.exports = new EmailController();
