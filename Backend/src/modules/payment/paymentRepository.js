const Payment = require("./paymentModel");

exports.createPayment = async (paymentData) => {
    try {
        const payment = new Payment(paymentData);
        return await payment.save();
    } catch (error) {
        console.error("Error creating payment:", error);
        throw new Error("Failed to create payment");
    }
};

exports.getPaymentById = async (paymentId) => {
    try {
        return await Payment.findById(paymentId);
    } catch (error) {
        console.error("Error getting payment by ID:", error);
        throw new Error("Failed to get payment by ID");
    }
};

exports.updatePayment = async (paymentId, updateData) => {
    try {
        return await Payment.findByIdAndUpdate(paymentId, updateData, {
            new: true,
        });
    } catch (error) {
        console.error("Error updating payment:", error);
        throw new Error("Failed to update payment");
    }
};
