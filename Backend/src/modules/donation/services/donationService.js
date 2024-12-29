const donationRepository = require("../repositories/donationRepository");
const paypalService = require("./paypalService");
const cardService = require("./cardService");
const emailService = require("./emailService");

/**
 * Creates a new donation and processes the payment.
 * 
 * @param {Object} donationData - Donation details including donor ID, project ID, amount, etc.
 * @returns {Object} - Contains donation record and payment gateway response.
 */
exports.createDonation = async (donationData) => {
    const { donor_id, project_id, amount, payment_method, cardDetails, message, is_recurring } = donationData;

    let paymentResponse;

    // Step 1: Handle PayPal and card payments
    if (payment_method === "paypal") {
        const paypalOrderId = await paypalService.createPayPalOrder(amount, project_id);
        paymentResponse = { paypal_order_id: paypalOrderId };
    } else if (payment_method === "card") {
        paymentResponse = await cardService.processCardPayment(amount, cardDetails);
    } else {
        throw new Error("Unsupported payment method");
    }

    // Step 2: Save the donation record to the database
    const donation = await donationRepository.createDonation({
        donor_id,
        project_id,
        amount,
        payment_method,
        message,
        status: "pending",
        is_recurring: is_recurring || false,
        payment_gateway_response: paymentResponse,
    });

    return { donation_id: donation.donation_id, paymentResponse };
};

/**
 * Captures a PayPal donation after donor approval.
 * 
 * @param {String} orderId - PayPal Order ID.
 * @param {String} donationId - The donation record ID.
 * @returns {Object} - The updated donation record.
 */
exports.captureDonation = async (orderId, donationId) => {
    try {
        // Step 1: Capture the PayPal order
        const captureResponse = await paypalService.capturePayPalOrder(orderId);

        // Step 2: Update the donation status in the database
        const status = captureResponse.status === "COMPLETED" ? "completed" : "failed";
        const updatedDonation = await donationRepository.updateDonationStatus(donationId, status, captureResponse);

        // Step 3: Send confirmation email if payment is successful
        if (status === "completed") {
            await emailService.sendDonationConfirmation(updatedDonation.donor_id, updatedDonation);
        }

        return updatedDonation;
    } catch (error) {
        throw new Error(`Error capturing donation: ${error.message}`);
    }
};
