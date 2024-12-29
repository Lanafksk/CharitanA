const donationService = require("../services/donationService");

/**
 * Creates a new donation record.
 */
exports.createDonation = async (req, res) => {
    try {
        const donationData = req.body; // donation details (donor_id, project_id, amount, payment_method, etc.)
        const donation = await donationService.createDonation(donationData);
        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Captures a PayPal donation.
 */
exports.captureDonation = async (req, res) => {
    try {
        const { orderId, donationId } = req.query;
        const donation = await donationService.captureDonation(orderId, donationId);
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
