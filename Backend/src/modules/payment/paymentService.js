const paymentRepository = require("./paymentRepository");
const paypalService = require("./paypalService");
const projectService = require("../project/projectService"); // Import project service
const donationService = require("../donation/donationService");

exports.initiatePayment = async (paymentData) => {
    try {
        // Get charity's PayPal email from project service
        const charityPaypalEmail = await projectService.getCharityPaypalEmail(
            paymentData.project_id
        );

        // Add charityPaypalEmail to paymentData
        paymentData.charityPaypalEmail = charityPaypalEmail;

        // Create a new payment record
        const paymentRecord = await paymentRepository.createPayment({
            ...paymentData,
            status: "pending",
        });

        if (paymentData.payment_method === "paypal") {
            // Create a PayPal order
            const { orderId, approvalUrl } =
                await paypalService.createOrder(paymentData);

            // Update the payment record with PayPal order ID
            await paymentRepository.updatePayment(paymentRecord._id, {
                payment_gateway_response: { orderId },
            });

            return { approvalUrl };
        } else {
            throw new Error("Unsupported payment method");
        }
    } catch (error) {
        console.error("Error initiating payment:", error);
        throw new Error("Failed to initiate payment");
    }
};

exports.capturePayment = async (orderId) => {
    try {
        // Capture the payment using the PayPal API
        const captureResponse = await paypalService.capturePayment(orderId);

        // Find the payment record associated with the order ID
        const paymentRecord = await paymentRepository.findPaymentByPaypalOrderId(
            orderId
        );
        if (!paymentRecord) {
            throw new Error(`Payment record not found for order ID: ${orderId}`);
        }

        // Update the payment record with the capture response and status
        const updatedPayment = await paymentRepository.updatePayment(
            paymentRecord._id,
            {
                status:
                    captureResponse.status === "COMPLETED" ? "completed" : "failed",
                payment_gateway_response: captureResponse,
            }
        );

        // If the payment was successful, create a donation record
        if (updatedPayment.status === "completed") {
            const donationData = {
                donor_id: updatedPayment.donor_id,
                project_id: updatedPayment.project_id,
                amount: updatedPayment.amount, // or extract from captureResponse
                payment_method: updatedPayment.payment_method,
                payment_id: updatedPayment.payment_id,
                message: updatedPayment.message, // Assuming you're storing the message in the Payment
                is_recurring: updatedPayment.is_recurring,
            };

            await donationService.createDonation(donationData);
        }

        return updatedPayment;
    } catch (error) {
        console.error("Error capturing payment:", error);
        throw new Error("Failed to capture payment");
    }
};