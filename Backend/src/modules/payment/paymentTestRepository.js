const Payment = require("./paymentModel");

// Create a test payment (for testing purposes)
exports.createPayment = async (paymentData) => {
    try {
        const payment = new Payment(paymentData);
        return await payment.save();
    } catch (error) {
        console.error("Error creating payment:", error);
        throw new Error("Failed to create payment");
    }
};

// Get all payments (for testing purposes)
exports.getAllPayments = async () => {
    try {
        return await Payment.find();
    } catch (error) {
        console.error("Error getting all payments:", error);
        throw new Error("Failed to get all payments");
    }
};

// Add other database operations as needed for testing (e.g., getPaymentById, updatePayment, etc.)