const Payment = require("./paymentModel");

exports.createPayment = async (paymentData) => {
    try {
        const payment = new Payment(paymentData);
        return await payment.save(); // Await the save operation
    } catch (error) {
        console.error("Error creating payment:", error);
        throw new Error("Failed to create payment", { cause: error });
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

exports.findPaymentByPaypalOrderId = async (orderId) => {
    try {
        return await Payment.findOne({ "payment_gateway_response.orderId": orderId });
    } catch (error) {
        console.error("Error finding payment by PayPal order ID:", error);
        throw new Error("Failed to find payment by PayPal order ID");
    }
};