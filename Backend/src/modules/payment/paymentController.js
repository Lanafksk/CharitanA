const paymentService = require("./paymentService");

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

exports.capturePayment = async (req, res) => {
    try {
        const { token } = req.query; // Extract the order ID (token) from the query parameters
        const updatedPayment = await paymentService.capturePayment(token);

        // Redirect the user to a success or failure page on your frontend
        if (updatedPayment.status === "completed") {
            res.redirect(`${process.env.YOUR_FRONTEND_URL}/payment-success`);
        } else {
            res.redirect(`${process.env.YOUR_FRONTEND_URL}/payment-failure`);
        }
    } catch (error) {
        console.error("Error capturing payment:", error);
        res.redirect(`${process.env.YOUR_FRONTEND_URL}/payment-failure`); // Redirect to an error page
    }
};