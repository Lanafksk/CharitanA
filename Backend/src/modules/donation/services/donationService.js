const donationRepository = require("../repositories/donationRepository");
const paypalService = require("./paypalService");
const emailService = require("../../email/services/mailerSendService");
const axios = require("axios");
const projectRepository = require('../project/projectRepository');

const API_GATEWAY = "http://localhost:5000/admin-server";

exports.createDonation = async (donationData) => {
    const { donor_id, project_id, amount, payment_method, message, is_recurring } =
        donationData;

    try {
        let paymentResponse;

        // Get project details
        const project = await projectRepository.getProjectById(project_id);
        if (!project) {
            throw new Error("Project not found.");
        }

        // Get charity ID from project
        const charityId = project.charity_id;

        // Fetch charity's PayPal email (or Payer ID) from Team B via API Gateway
        const charityResponse = await axios.get(
            `${API_GATEWAY}/charity/id/${charityId}`
        );

        const charityData = charityResponse.data.charityResponse.data[0];
        if (!charityData) {
            throw new Error("Charity data not found in response from Team B.");
        }
        const charityPaypalEmail = charityData.paypal_email; // Or the field where Team B stores the PayPal email
        // OR: const charityPayerId = charityData.paypal_payer_id; // Or the field for Payer ID

        if (payment_method === "paypal") {
            if (is_recurring) {
                // Create a PayPal subscription (Plan)
                const planId = await paypalService.createSubscriptionPlan(
                    amount,
                    "MONTHLY",
                    project_id,
                    charityPaypalEmail
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
                    project_id,
                    charityPaypalEmail
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

        // Get more details about the transaction from the capture response
        const payerEmail = captureResponse.payer.email_address;
        const payerName = `${captureResponse.payer.name.given_name} ${captureResponse.payer.name.surname}`;

        const updatedDonation = await donationRepository.updateDonationStatus(
            donationId,
            status,
            captureResponse
        );

        if (status === "completed") {
            // Send confirmation email using your email service
            await emailService.sendDonationConfirmation(
                { email: payerEmail, name: payerName }, // Use donor's email and name from PayPal
                {
                    donationId: updatedDonation.donation_id,
                    amount: updatedDonation.amount,
                    projectName: "Project Name", //  Get the actual project name from the database using updatedDonation.project_id
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
    const customerId = webhookEvent.resource.subscriber.payer_id;
    const email_address = webhookEvent.resource.subscriber.email_address;
    const payerName = `${webhookEvent.resource.subscriber.name.given_name} ${webhookEvent.resource.subscriber.name.surname}`;
    const status = webhookEvent.resource.status;

    // 3. Find the corresponding donation record using the plan_id and update it.
    const donation = await donationRepository.findDonationByPlanId(planId);
    if (donation) {
        donation.payment_gateway_response.subscription_id = subscriptionId;
        donation.status = "active-subscription";
        donation.donor_id = customerId; // Map the customerId to your donor_id
        await donationRepository.updateDonationStatus(
            donation.donation_id,
            "active-subscription",
            donation.payment_gateway_response
        );

        // 4. Send a confirmation email to the donor.
        await emailService.sendDonationConfirmation(
            { email: email_address, name: payerName },
            {
                donationId: donation.donation_id,
                amount: donation.amount,
                projectName: "Project Name", // Get the actual project name from the database using donation.project_id
                date: new Date().toLocaleDateString(),
                subscriptionId: subscriptionId
            }
        );
    } else {
        console.error(`Could not find donation with plan ID: ${planId}`);
    }
};

// Get a specific donation by ID
exports.getDonationById = async (donationId) => {
    try {
        const donation = await donationRepository.getDonationById(donationId);
        return donation;
    } catch (error) {
        throw new Error(`Error fetching donation by ID: ${error.message}`);
    }
};

// Get donation history for a specific donor
exports.getDonationHistoryByDonor = async (donorId) => {
    try {
        const donationHistory = await donationRepository.getDonorDonationHistory(donorId);
        return donationHistory;
    } catch (error) {
        throw new Error(`Error fetching donation history for donor: ${error.message}`);
    }
};

// Get the total donation amount for a specific donor
exports.getTotalDonationAmountByDonor = async (donorId) => {
    try {
        const totalAmount = await donationRepository.getTotalDonationAmount(donorId);
        return totalAmount;
    } catch (error) {
        throw new Error(`Error getting total donation amount for donor: ${error.message}`);
    }
};

// Get the total number of projects a donor has participated in
exports.getTotalProjectsParticipatedByDonor = async (donorId) => {
    try {
        const totalProjects = await donationRepository.getTotalProjectsParticipated(donorId);
        return totalProjects;
    } catch (error) {
        throw new Error(`Error getting total projects participated in for donor: ${error.message}`);
    }
};

// Get a list of donors with their total donation amounts (for leaderboard)
exports.getLeaderboard = async () => {
    try {
        const leaderboard = await donationRepository.getLeaderboard();
        return leaderboard;
    } catch (error) {
        throw new Error(`Error fetching leaderboard: ${error.message}`);
    }
};