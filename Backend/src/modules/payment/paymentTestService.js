const paymentTestRepository = require("./paymentTestRepository");

// Create a test payment (for testing purposes)
exports.createTestPayment = async (paymentData) => {
    try {
        // Directly create a payment using the repository
        // No need to call paypalService or projectService here
        const paymentRecord = await paymentTestRepository.createPayment(paymentData);
        return paymentRecord;
    } catch (error) {
        console.error("Error creating test payment:", error);
        throw new Error(error.message);
    }
};

// Get all payments (for testing purposes)
exports.getAllPayments = async () => {
    try {
        const payments = await paymentTestRepository.getAllPayments();
        return payments;
    } catch (error) {
        console.error("Error fetching all payments:", error);
        throw new Error("Error fetching all payments");
    }
};