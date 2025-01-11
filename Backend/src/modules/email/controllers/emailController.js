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
                logger.info('Incoming request for sendDonationConfirmation', { requestBody: req.body });
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

    /**
     * Sends a welcome email to a all users that subscribe to specific religion.
     * Route: POST /api/emails/send-welcome-email-charity
     */
    async sendProjectNotification(req, res) {
        try {
            const { projectData, user } = req.body; // Get projectData and user

            // Basic validation
            if (!projectData || !user) {
                return res.status(400).json({ error: "Invalid request body" });
            }

            const result = await mailerSendService.sendProjectNotification(
                projectData,
                user
            );

            if (result.success) {
                res.status(200).json({ message: "Project notification sent successfully" });
            } else {
                res.status(500).json({
                    error: "Failed to send project notification",
                    details: result.error,
                });
            }
        } catch (error) {
            console.error("Error in sendProjectNotification:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }



    /**
   * Sends an email to the donor of a halted project (simplified version).
   * Expects `to`, `projectData`, and `reason` in the request body.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @returns {Promise<void>}
   */
    async sendProjectHaltedEmail(req, res) {
        const { to, projectData, reason } = req.body;

        try {
            // 1. Validate the input
            if (!to || !to.email || !to.name || !projectData || !reason) {
                return res.status(400).json({
                    error:
                        "Missing required fields: to ({email, name}), projectData ({projectId, projectTitle}), reason",
                });
            }

            if (!projectData.projectId || !projectData.projectTitle) {
                return res.status(400).json({
                    error: "projectData must contain projectId and projectTitle",
                });
            }

            // 2. Send email to the recipient
            const emailData = {
                from: { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
                to: { email: to.email, name: to.name }, // Use the provided email and name directly
                subject: `Project ${projectData.projectTitle} Has Been Halted`,
                templateName: "projectHalted.html", // Your email template
                data: {
                    projectName: projectData.projectTitle,
                    reason: reason,
                    donorName: to.name,
                },
            };

            const result = await mailerSendService.sendEmailWithTemplate(
                emailData.from,
                emailData.to,
                emailData.subject,
                emailData.templateName,
                emailData.data
            );

            if (!result.success) {
                logger.error(
                    `Failed to send project halted email to ${to.email}`,
                    { error: result.error }
                );
                // Handle email sending failures (log, retry, etc.)
            } else {
                logger.info(`Project halted email sent to ${to.email}`, {
                    messageId: result.messageId,
                });
            }

            res.status(200).json({ message: "Project halted email sent successfully." });
        } catch (error) {
            logger.error("Error sending project halted email:", error);
            res.status(500).json({ error: "Failed to send project halted email." });
        }
    }
}

module.exports = new EmailController();
