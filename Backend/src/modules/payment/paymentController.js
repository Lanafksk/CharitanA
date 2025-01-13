const paymentService = require("./paymentService");

// Initiate a new payment
exports.initiatePayment = async (req, res) => {
    try {
        const paymentData = req.body;
        const { approvalUrl } = await paymentService.initiatePayment(paymentData);
        res.status(200).json({ approvalUrl });
    } catch (error) {
        console.error("Error initiating payment:", error);
        res.status(500).json({ error: error.message });
    }
};

// Capture a PayPal payment after user approval
exports.capturePayment = async (req, res) => {
    try {
        const { token } = req.query; // Extract the order ID (token) from the query parameters
        const updatedPayment = await paymentService.capturePayment(token);

        // Check if the payment was completed successfully
        if (updatedPayment.status === "completed") {
            // Send a success response to the frontend
            res.status(200).json({ message: "Payment captured successfully" });
        } else {
            // Handle payment failure
            res.status(500).json({ error: "Payment failed to capture" });
        }
    } catch (error) {
        console.error("Error capturing payment:", error);
        // Handle errors gracefully and inform the user
        res.status(500).json({ error: error.message });
    }
};

// Handle PayPal webhooks (for payment updates, etc.)
exports.handlePaypalWebhook = async (req, res) => {
    try {
        // 1. Verify the webhook signature (IMPORTANT!)
        // Use the PayPal SDK or a library to verify the signature.
        // This ensures the webhook is genuinely from PayPal.

        // 2. Extract relevant data from the webhook payload
        const eventType = req.body.event_type;
        const resource = req.body.resource;

        // 3. Handle different event types
        switch (eventType) {
            case "CHECKOUT.ORDER.APPROVED":
                // The user approved the order on PayPal.
                // You might not need to do anything here if you're capturing immediately
                // after approval using the /capture route.
                break;

            case "PAYMENT.CAPTURE.COMPLETED":
                // The payment was successfully captured.
                // Update the payment status to "completed."
                // Find the payment record using the order ID or transaction ID from `resource`.
                // Create a donation record.
                const orderId = resource.supplementary_data.related_ids.order_id;
                const updatedPayment = await paymentService.capturePayment(orderId);

                if (updatedPayment.status !== "completed") {
                    console.error(`Payment ${updatedPayment.payment_id} not completed`);
                }

                break;

            case "PAYMENT.CAPTURE.DENIED":
            case "PAYMENT.CAPTURE.FAILED":
            case "PAYMENT.CAPTURE.PENDING":
                // Handle payment failures or pending status.
                // Update the payment status accordingly.
                break;

            // Add cases for other relevant event types...

            default:
                console.warn(`Unhandled PayPal webhook event type: ${eventType}`);
        }

        // 4. Respond with a 200 OK status to acknowledge receipt of the webhook.
        res.status(200).send("Webhook received");
    } catch (error) {
        console.error("Error handling PayPal webhook:", error);
        res.status(500).json({ error: error.message });
    }
};