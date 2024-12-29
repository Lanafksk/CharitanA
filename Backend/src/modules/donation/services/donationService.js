const donationRepository = require("../repositories/donationRepository");
const paypalService = require("./paypalService");
const emailService = require("../../email/services/mailerSendService"); // Use your email service

exports.createDonation = async (donationData) => {
    const {
        donor_id,
        project_id,
        amount,
        payment_method,
        message,
        is_recurring,
    } = donationData;

    try {
        let paymentResponse;

        if (payment_method === "paypal") {
            if (is_recurring) {
                // Create a PayPal subscription (Plan)
                const planId = await paypalService.createSubscriptionPlan(
                    amount,
                    "MONTHLY", // You can make this configurable if needed
                    project_id
                );

                // Generate approval link for subscription
                const approvalLink = await paypalService.getSubscriptionApprovalLink(
                    planId
                );
                paymentResponse = {
                    subscription_approval_link: approvalLink,
                    plan_id: planId,
                };
            } else {
                // Create a one-time PayPal order
                const paypalOrderId = await paypalService.createPayPalOrder(
                    amount,
                    project_id
                );
                paymentResponse = { paypal_order_id: paypalOrderId };
            }
        } else {
            throw new Error("Unsupported payment method");
        }

        // Save donation record (initially as pending, even for subscriptions)
        const donation = await donationRepository.createDonation({
            donor_id,
            project_id,
            amount,
            payment_method,
            message,
            status: "pending",
            is_recurring: is_recurring || false,
            payment_gateway_response: paymentResponse,
        });

        return { donation_id: donation.donation_id, paymentResponse };
    } catch (error) {
        console.error("Error creating donation:", error);
        throw new Error(`Error creating donation: ${error.message}`);
    }
};

exports.captureDonation = async (orderId, donationId) => {
    try {
        const captureResponse = await paypalService.capturePayPalOrder(orderId);
        const status = captureResponse.status === "COMPLETED" ? "completed" : "failed";
        const updatedDonation = await donationRepository.updateDonationStatus(
            donationId,
            status,
            captureResponse
        );

        if (status === "completed") {
            // Send confirmation email using your email service
            await emailService.sendDonationConfirmation(
                { email: updatedDonation.donor_id, name: "Dear Donor" }, // Replace with actual donor name if available
                {
                    donationId: updatedDonation.donation_id,
                    amount: updatedDonation.amount,
                    projectName: "Project Name", // Replace with actual project name
                    date: new Date().toLocaleDateString(),
                }
            );
        }

        return updatedDonation;
    } catch (error) {
        console.error("Error capturing donation:", error);
        throw new Error(`Error capturing donation: ${error.message}`);
    }
};

exports.handleSubscriptionCreated = async (webhookEvent) => {
    // 1. Verify the webhook event (using PayPal signature verification)
    // ... (Implementation for webhook verification - you'll need to add this logic)

    // 2. Extract relevant data from the webhook event
    const subscriptionId = webhookEvent.resource.id;
    const planId = webhookEvent.resource.plan_id;
    const customerId = webhookEvent.resource.subscriber.payer_id; // Get the PayPal Payer ID
    const email_address = webhookEvent.resource.subscriber.email_address; // Get email
    const status = webhookEvent.resource.status;

    // 3. Find the corresponding donation record using the plan_id and update it.
    const donation = await donationRepository.findDonationByPlanId(planId);
    if (donation) {
        donation.payment_gateway_response.subscription_id = subscriptionId;
        donation.status = "active-subscription";
        donation.donor_id = customerId; // Map the customerId to your donor_id
        await donationRepository.updateDonationStatus(
            donation.donation_id,
            "active-subscription", // Or a similar status
            donation.payment_gateway_response
        );

        // 4. Send a confirmation email to the donor.
        await emailService.sendDonationConfirmation(
            { email: email_address, name: "Donor Name" }, // Use actual donor name if available
            {
                donationId: donation.donation_id,
                amount: donation.amount,
                projectName: "Project Name", // Get actual project name
                date: new Date().toLocaleDateString(),
                subscriptionId: subscriptionId
            }
        );
    } else {
        console.error(`Could not find donation with plan ID: ${planId}`);
    }
};