// File: ./Team-A/Backend/src/modules/donation/controllers/donationController.js

const donationService = require("../services/donationService");

// Create a new donation
exports.createDonation = async (req, res) => {
    try {
        const donationData = req.body; // donor_id, project_id, amount, payment_method, is_recurring, etc.
        const donation = await donationService.createDonation(donationData);
        res.status(201).json(donation);
    } catch (error) {
        console.error("Error in createDonation controller:", error);
        res.status(500).json({ error: error.message });
    }
};

// Capture a PayPal order (for one-time donations)
exports.captureDonation = async (req, res) => {
    try {
        const { orderId, donationId } = req.query;
        const donation = await donationService.captureDonation(orderId, donationId);
        res.status(200).json(donation);
    } catch (error) {
        console.error("Error in captureDonation controller:", error);
        res.status(500).json({ error: error.message });
    }
};

// Handle successful subscription (redirect from PayPal)
exports.handleSubscriptionSuccess = async (req, res) => {
    try {
        res.status(200).json({ message: "Subscription created successfully!" });
    } catch (error) {
        console.error("Error handling subscription success:", error);
        res.status(500).json({ error: error.message });
    }
};

// Handle PayPal webhooks
exports.handlePaypalWebhook = async (req, res) => {
    const eventType = req.body.event_type;

    try {
        switch (eventType) {
            case "BILLING.SUBSCRIPTION.CREATED":
                await donationService.handleSubscriptionCreated(req.body);
                break;
            // Handle other relevant events like PAYMENT.SALE.COMPLETED for recurring payments
            // ...
            default:
                console.log(`Unhandled event type: ${eventType}`);
        }
    } catch (error) {
        console.error("Error handling PayPal webhook:", error);
    }

    res.status(200).send(); // Acknowledge receipt of the event (IMPORTANT)
};

// Get a specific donation by ID
exports.getDonationById = async (req, res) => {
    try {
        const donationId = req.params.id;
        const donation = await donationService.getDonationById(donationId);
        if (!donation) {
            return res.status(404).json({ error: 'Donation not found' });
        }
        res.status(200).json(donation);
    } catch (err) {
        console.error('Error getting donation by ID:', err);
        res.status(500).json({ error: err.message });
    }
};

// Get donation history for a specific donor
exports.getDonationHistoryByDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId;
        const donationHistory = await donationService.getDonationHistoryByDonor(donorId);
        res.status(200).json(donationHistory);
    } catch (err) {
        console.error('Error getting donation history by donor:', err);
        res.status(500).json({ error: err.message });
    }
};

// Get the total donation amount for a specific donor
exports.getTotalDonationAmountByDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId;
        const totalAmount = await donationService.getTotalDonationAmountByDonor(donorId);
        res.status(200).json({ totalAmount });
    } catch (err) {
        console.error('Error getting total donation amount by donor:', err);
        res.status(500).json({ error: err.message });
    }
};

// Get the total number of projects a donor has participated in
exports.getTotalProjectsParticipatedByDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId;
        const totalProjects = await donationService.getTotalProjectsParticipatedByDonor(donorId);
        res.status(200).json({ totalProjects });
    } catch (err) {
        console.error('Error getting total projects participated by donor:', err);
        res.status(500).json({ error: err.message });
    }
};

// Get a list of donors with their total donation amounts (for leaderboard)
exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await donationService.getLeaderboard();
        res.status(200).json(leaderboard);
    } catch (err) {
        console.error('Error getting leaderboard:', err);
        res.status(500).json({ error: err.message });
    }
};