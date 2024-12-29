const donationRepository = require("../repositories/donationRepository");
const paypalService = require("./paypalService");
const cardService = require("./cardService");
const emailService = require("./emailService");

/**
 * Creates a new donation record and initiates payment.
 * 
 * @param {Object} donationData - The donation details (donor ID, project ID, amount, etc.).
 * @returns {Object} - The donation record and payment gateway response.
 */
exports.createDonation = async (donationData) => {
    const { donor_id, project_id, amount, payment_method, cardDetails, message, is_recurring } = donationData;

    try {
        let paymentResponse;

        // Handle payment method
        if (payment_method === "paypal") {
            const paypalOrderId = await paypalService.createPayPalOrder(amount, project_id);
            paymentResponse = { paypal_order_id: paypalOrderId };
        } else if (payment_method === "card") {
            paymentResponse = await cardService.processCardPayment(amount, cardDetails);
        } else {
            throw new Error("Unsupported payment method");
        }

        // Save donation record
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
    } catch (error) {
        throw new Error(`Error creating donation: ${error.message}`);
    }
};

/**
 * Captures a PayPal payment after approval by the donor.
 * 
 * @param {String} orderId - The PayPal order ID to capture.
 * @param {String} donationId - The donation record ID in the database.
 * @returns {Object} - The updated donation record.
 */
exports.captureDonation = async (orderId, donationId) => {
    try {
        const captureResponse = await paypalService.capturePayPalOrder(orderId);

        const status = captureResponse.status === "COMPLETED" ? "completed" : "failed";
        const updatedDonation = await donationRepository.updateDonationStatus(donationId, status, captureResponse);

        if (status === "completed") {
            await emailService.sendDonationConfirmation(updatedDonation.donor_id, updatedDonation);
        }

        return updatedDonation;
    } catch (error) {
        throw new Error(`Error capturing donation: ${error.message}`);
    }
};
