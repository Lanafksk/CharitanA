// src/modules/email/services/mailerSendService.js

const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const logger = require('../utils/logger'); // Import the logger
const sanitizeHtml = require('sanitize-html'); // For sanitizing email data
const { formatDate, formatCurrency } = require('../utils/emailHelpers'); // Import helper functions

class MailerSendService {
    constructor() {
        this.mailersend = new MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY,
        });
        this.templateCache = {}; // Initialize template cache

        // Register Handlebars helpers
        Handlebars.registerHelper('formatDate', function (date) {
            return formatDate(date);
        });

        Handlebars.registerHelper('formatCurrency', function (amount) {
            return formatCurrency(amount);
        });
    }

    /**
     * Reads and compiles an email template using Handlebars.
     * Implements caching to improve performance.
     * @param {string} templateName - The filename of the template.
     * @param {object} data - The data to inject into the template.
     * @returns {string} - The compiled HTML content.
     */
    readAndCompileTemplate(templateName, data) {
        // Check if the template is already cached
        if (!this.templateCache[templateName]) {
            const templatePath = path.join(__dirname, '..', 'templates', templateName);

            // Check if the template file exists
            if (!fs.existsSync(templatePath)) {
                logger.error(`Template ${templateName} not found at path: ${templatePath}`);
                throw new Error(`Template ${templateName} not found`);
            }

            // Read and compile the template
            const source = fs.readFileSync(templatePath, 'utf8');
            this.templateCache[templateName] = Handlebars.compile(source);
            logger.info(`Template ${templateName} compiled and cached`);
        }

        // Sanitize the data to prevent injection attacks
        const sanitizedData = {};
        for (const key in data) {
            if (typeof data[key] === 'string') {
                sanitizedData[key] = sanitizeHtml(data[key]);
            } else {
                sanitizedData[key] = data[key];
            }
        }

        // Return the compiled template with sanitized data
        return this.templateCache[templateName](sanitizedData);
    }

    /**
     * Sends an email using a specified template.
     * @param {object} from - Sender's email and name.
     * @param {object} to - Recipient's email and name.
     * @param {string} subject - Subject of the email.
     * @param {string} templateName - Template filename.
     * @param {object} data - Data to inject into the template.
     * @returns {object} - Result of the email sending operation.
     */
    async sendEmailWithTemplate(from, to, subject, templateName, data) {
        const sentFrom = new Sender(from.email, from.name);
        const recipients = [new Recipient(to.email, to.name)];

        let htmlContent;
        try {
            htmlContent = this.readAndCompileTemplate(templateName, data);
        } catch (templateError) {
            logger.error(`Template compilation failed for ${templateName}: ${templateError.message}`);
            return { success: false, error: templateError.message };
        }

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject(subject)
            .setHtml(htmlContent);

        try {
            const response = await this.mailersend.email.send(emailParams);
            logger.info(`Email sent successfully to ${to.email}`, { messageId: response.headers['x-message-id'] });
            return { success: true, messageId: response.headers['x-message-id'] };
        } catch (error) {
            logger.error(`Error sending email to ${to.email}: ${error.body}`);
            return { success: false, error: error.body };
        }
    }

    /**
     * Sends a donation confirmation email.
     * @param {object} to - Recipient's email and name.
     * @param {object} data - Donation-related data.
     * @returns {object} - Result of the email sending operation.
     */
    async sendDonationConfirmation(to, data) {
        return this.sendEmailWithTemplate(
            { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
            to,
            "Donation Confirmation",
            "donationConfirmation.html",
            data
        );
    }

    /**
     * Sends a project creation confirmation email.
     * @param {object} to - Recipient's email and name.
     * @param {object} data - Project-related data.
     * @returns {object} - Result of the email sending operation.
     */
    async sendProjectCreationConfirmation(to, data) {
        return this.sendEmailWithTemplate(
            { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
            to,
            "Project Creation Confirmation",
            "projectCreationConfirmation.html",
            data
        );
    }

    /**
     * Sends a welcome email to a new donor.
     * @param {object} to - Recipient's email and name.
     * @param {object} data - Donor-related data.
     * @returns {object} - Result of the email sending operation.
     */
    async sendWelcomeEmailDonor(to, data) {
        return this.sendEmailWithTemplate(
            { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
            to,
            "Welcome to Charitan!",
            "welcomeEmailDonor.html",
            data
        );
    }

    /**
     * Sends a welcome email to a new charity.
     * @param {object} to - Recipient's email and name.
     * @param {object} data - Charity-related data.
     * @returns {object} - Result of the email sending operation.
     */
    async sendWelcomeEmailCharity(to, data) {
        return this.sendEmailWithTemplate(
            { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
            to,
            "Welcome to Charitan!",
            "welcomeEmailCharity.html",
            data
        );
    }
}

module.exports = new MailerSendService();
