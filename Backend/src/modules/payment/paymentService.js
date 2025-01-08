const paymentRepository = require("./paymentRepository");
const paypalService = require("./paypalService");
const projectService = require("../project/projectService");
const donationService = require("../donation/donationService");

exports.initiatePayment = async (paymentData) => {
    console.log("Entering initiatePayment with data:", paymentData);
    try {
        // Get charity's PayPal email from project service
        const charityPaypalEmail = await projectService.getCharityPaypalEmail(
            paymentData.project_id
        );
        console.log("Charity PayPal email:", charityPaypalEmail);

        // Add charityPaypalEmail to paymentData
        paymentData.charityPaypalEmail = charityPaypalEmail;

        // Create a new payment record
        const paymentRecord = await paymentRepository.createPayment({
            ...paymentData,
            status: "pending",
        });
        console.log("Payment record created:", paymentRecord);

        if (paymentData.payment_method === "paypal") {
            // Create a PayPal order
            const { orderId, approvalUrl } = await paypalService.createOrder(
                paymentData
            );

            console.log("PayPal order created:", orderId, approvalUrl);

            // Update the payment record with PayPal order ID
            await paymentRepository.updatePayment(paymentRecord._id, {
                payment_gateway_response: { orderId },
            });

            console.log("Payment record updated with order ID:", orderId);

            return { approvalUrl };
        } else {
            throw new Error("Unsupported payment method");
        }
    } catch (error) {
        console.error("Error initiating payment:", error);
        throw new Error(error.message); // Re-throw error
    }
};

exports.capturePayment = async (orderId) => {
    try {
        // Capture the payment using the PayPal API
        const captureResponse = await paypalService.capturePayment(orderId);
        console.log("Payment captured, response:", captureResponse);

        // Get order details to check payment method
        const orderDetails = await paypalService.getOrder(orderId);
        console.log("Order details:", orderDetails);

        // Determine the payment method based on the payer information
        const paymentMethod = orderDetails.payment_source
            ? Object.keys(orderDetails.payment_source)[0]
            : "paypal";

        // Find the payment record associated with the order ID
        const paymentRecord = await paymentRepository.findPaymentByPaypalOrderId(
            orderId
        );
        if (!paymentRecord) {
            throw new Error(`Payment record not found for order ID: ${orderId}`);
        }

        console.log("Payment record found:", paymentRecord);

        // Update the payment record with the capture response and status
        const updatedPayment = await paymentRepository.updatePayment(
            paymentRecord._id,
            {
                status:
                    captureResponse.status === "COMPLETED" ? "completed" : "failed",
                payment_method: paymentMethod,
                payment_gateway_response: {
                    ...paymentRecord.payment_gateway_response,
                    captureResponse,
                    payer: orderDetails.payer, // Save payer information
                },
            }
        );
        console.log("Payment record updated:", updatedPayment);

        // If the payment was successful, create a donation record
        if (updatedPayment.status === "completed") {
            const donationData = {
                donor_id: updatedPayment.donor_id,
                project_id: updatedPayment.project_id,
                amount: updatedPayment.amount, // or extract from captureResponse
                payment_method: paymentMethod, // Use the determined payment method
                payment_id: updatedPayment.payment_id,
                message: updatedPayment.message, // Assuming you're storing the message in the Payment
                is_recurring: updatedPayment.is_recurring,
            };

            console.log("Creating donation with data:", donationData);
            await donationService.createDonation(donationData);
            console.log("Donation created successfully.");
        }

        return updatedPayment;
    } catch (error) {
        console.error("Error capturing payment:", error);
        throw new Error(error.message);
    }
};