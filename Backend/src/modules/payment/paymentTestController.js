const paymentTestService = require("./paymentTestService");

// Create a test payment (for testing purposes)
exports.createTestPayment = async (req, res) => {
    try {
        const paymentData = req.body;
        const newPayment = await paymentTestService.createTestPayment(paymentData);
        res.status(201).json(newPayment);
    } catch (error) {
        console.error("Error creating test payment:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get all payments (for testing purposes)
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await paymentTestService.getAllPayments();
        res.status(200).json(payments);
    } catch (error) {
        console.error("Error fetching all payments:", error);
        res.status(500).json({ error: error.message });
    }
};