const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

class MailerSendService {
    constructor() {
        this.mailersend = new MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY,
        });
        this.templateCache = {};
    }

    readAndCompileTemplate(templateName, data) {
        if (!this.templateCache[templateName]) {
            const templatePath = path.join(__dirname, '..', 'templates', templateName);
            if (!fs.existsSync(templatePath)) {
                throw new Error(`Template ${templateName} not found`);
            }
            const source = fs.readFileSync(templatePath, 'utf8');
            this.templateCache[templateName] = Handlebars.compile(source);
        }
        return this.templateCache[templateName](data);
    }

    async sendEmailWithTemplate(from, to, subject, templateName, data) {
        const sentFrom = new Sender(from.email, from.name);
        const recipients = [new Recipient(to.email, to.name)];

        const htmlContent = this.readAndCompileTemplate(templateName, data);

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject(subject)
            .setHtml(htmlContent);

        try {
            const response = await this.mailersend.email.send(emailParams);
            console.log("Email sent successfully:", response.headers);
            return { success: true, messageId: response.headers['x-message-id'] };
        } catch (error) {
            console.error("Error sending email:", error.body);
            return { success: false, error: error.body };
        }
    }

    async sendDonationConfirmation(to, data) {
        return this.sendEmailWithTemplate(
            { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
            to,
            "Donation Confirmation",
            "donationConfirmation.html",
            data
        );
    }

    async sendProjectCreationConfirmation(to, data) {
        return this.sendEmailWithTemplate(
            { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
            to,
            "Project Creation Confirmation",
            "projectCreationConfirmation.html",
            data
        );
    }

    async sendWelcomeEmailDonor(to, data) {
        return this.sendEmailWithTemplate(
            { email: process.env.EMAIL_FROM, name: process.env.EMAIL_FROM_NAME },
            to,
            "Welcome to Charitan!",
            "welcomeEmailDonor.html",
            data
        );
    }

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