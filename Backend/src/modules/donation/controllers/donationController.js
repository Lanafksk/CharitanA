const donationService = require("../services/donationService");

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

// Handle successful subscription
exports.handleSubscriptionSuccess = async (req, res) => {
    try {
        res.status(200).json({ message: "Subscription created successfully!" });
    } catch (error) {
        console.error("Error handling subscription success:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.handlePaypalWebhook = async (req, res) => {
    const eventType = req.body.event_type;

    try {
        switch (eventType) {
            case "BILLING.SUBSCRIPTION.CREATED":
                await donationService.handleSubscriptionCreated(req.body);
                break;
            default:
                console.log(`Unhandled event type: ${eventType}`);
        }
    } catch (error) {
        console.error("Error handling PayPal webhook:", error);
    }
    res.status(200).send();
};