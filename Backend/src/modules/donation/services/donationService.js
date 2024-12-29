const donationRepository = require("../repositories/donationRepository");
const paypalService = require("./paypalService");
const cardService = require("./cardService");
const emailService = require("../../email/services/mailerSendService"); // Importing the existing email service

/**
 * Creates a new donation and processes the payment.
 * 
 * @param {Object} donationData - Donation details (donor ID, project ID, amount, etc.).
 * @returns {Object} - The donation record and payment gateway response.
 */
exports.createDonation = async (donationData) => {
    const { donor_id, project_id, amount, payment_method, cardDetails, message, is_recurring } = donationData;

    let paymentResponse;

    // Handle PayPal and card payments based on the payment method
    if (payment_method === "paypal") {
        // Create PayPal order for donation
        const paypalOrderId = await paypalService.createPayPalOrder(amount, project_id);
        paymentResponse = { paypal_order_id: paypalOrderId };
    } else if (payment_method === "card") {
        // Process card payment via Stripe
        paymentResponse = await cardService.processCardPayment(amount, cardDetails);
    } else {
        throw new Error("Unsupported payment method");
    }

    // Save the donation record to the database
    const donation = await donationRepository.createDonation({
        donor_id,
        project_id,
        amount,
        payment_method,
        message,
        status: "pending", // Initially set to "pending" before payment is processed
        is_recurring: is_recurring || false,
        payment_gateway_response: paymentResponse,
    });

    // Send donation confirmation email to the donor
    const donorEmail = donor_id; // Assuming donor_id corresponds to an email or fetch from a database
    await emailService.sendDonationConfirmation({ email: donorEmail, name: "Donor Name" }, {
        amount: donation.amount,
        project_id: donation.project_id,
    });

    // Send notification email to the charity
    const charityEmail = "charity@example.com"; // Replace with the actual charity email, either from the project or another source
    await emailService.notifyCharity({ email: charityEmail, name: "Charity Name" }, {
        amount: donation.amount,
        project_id: donation.project_id,
    });

    return { donation_id: donation.donation_id, paymentResponse };
};

/**
 * Captures a PayPal donation after approval by the donor.
 * 
 * @param {String} orderId - PayPal Order ID.
 * @param {String} donationId - The donation record ID in the database.
 * @returns {Object} - The updated donation record.
 */
exports.captureDonation = async (orderId, donationId) => {
    try {
        // Step 1: Capture the PayPal order
        const captureResponse = await paypalService.capturePayPalOrder(orderId);

        // Step 2: Update the donation status to completed or failed
        const status = captureResponse.status === "COMPLETED" ? "completed" : "failed";
        const updatedDonation = await donationRepository.updateDonationStatus(donationId, status, captureResponse);

        // Step 3: Send confirmation email if payment is successful
        if (status === "completed") {
            const donorEmail = updatedDonation.donor_id; // Assuming the donor email is stored or accessible
            await emailService.sendDonationConfirmation({ email: donorEmail, name: "Donor Name" }, updatedDonation);
        }

        return updatedDonation;
    } catch (error) {
        throw new Error(`Error capturing donation: ${error.message}`);
    }
};
