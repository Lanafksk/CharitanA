const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const sanitizeHtml = require("sanitize-html"); // For sanitizing email data
const logger = require("../utils/logger"); // Import the logger
const { formatDate, formatCurrency } = require("../utils/emailHelpers"); // Helper functions

class MailerSendService {
    constructor() {
        this.mailersend = new MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY,
        });

        this.templateCache = {}; // Cache for compiled templates

        // Register Handlebars helpers
        Handlebars.registerHelper("formatDate", (date) => formatDate(date));
        Handlebars.registerHelper("formatCurrency", (amount) => formatCurrency(amount));
    }

    /**
     * Reads and compiles an email template with Handlebars.
     * Implements caching to improve performance.
     * @param {string} templateName - The filename of the template.
     * @param {object} data - The data to inject into the template.
     * @returns {string} - The compiled HTML content.
     */
    readAndCompileTemplate(templateName, data) {
        try {
            // Check if the template is cached
            if (!this.templateCache[templateName]) {
                const templatePath = path.join(__dirname, "..", "templates", templateName);

                // Validate template existence
                if (!fs.existsSync(templatePath)) {
                    logger.error(`Template not found: ${templateName}`);
                    throw new Error(`Template "${templateName}" not found`);
                }

                // Read and compile the template
                const source = fs.readFileSync(templatePath, "utf8");
                this.templateCache[templateName] = Handlebars.compile(source);
                logger.info(`Template "${templateName}" compiled and cached`);
            }

            // Sanitize the data to prevent injection attacks
            const sanitizedData = {};
            for (const key in data) {
                if (typeof data[key] === "string") {
                    sanitizedData[key] = sanitizeHtml(data[key]);
                } else {
                    sanitizedData[key] = data[key];
                }
            }

            // Return compiled template
            return this.templateCache[templateName](sanitizedData);
        } catch (error) {
            logger.error(`Error in template processing: ${error.message}`);
            throw error;
        }
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
        // Validate inputs
        if (!to || !to.email || !to.name) {
            const errorMsg = `"to" object with valid "email" and "name" is required`;
            logger.error(errorMsg, { to });
            return { success: false, error: errorMsg };
        }

        try {
            // Compile the email template
            const htmlContent = this.readAndCompileTemplate(templateName, data);

            // Prepare email parameters
            const sentFrom = new Sender(from.email, from.name);
            const recipients = [new Recipient(to.email, to.name)];
            const emailParams = new EmailParams()
                .setFrom(sentFrom)
                .setTo(recipients)
                .setSubject(subject)
                .setHtml(htmlContent);

            // Send the email
            const response = await this.mailersend.email.send(emailParams);
            logger.info(`Email sent successfully to ${to.email}`, {
                messageId: response.headers["x-message-id"],
            });
            return { success: true, messageId: response.headers["x-message-id"] };
        } catch (error) {
            logger.error(`Error sending email to ${to.email}: ${error.message}`, { error });
            return { success: false, error: error.message };
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
