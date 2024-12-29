const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_URL, HOST, TEAM_A_PORT } = process.env;
const PAYPAL_API = PAYPAL_API_URL;
const BASE_URL = `${HOST}:${TEAM_A_PORT}`; // Or your server's base URL

// Cache the access token
let accessToken = null;
let tokenExpiration = null;

async function getPayPalAccessToken() {
    if (accessToken && tokenExpiration > Date.now()) {
        return accessToken;
    }

    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const url = `${PAYPAL_API}/v1/oauth2/token`;

    try {
        const response = await axios({
            method: "post",
            url: url,
            headers: {
                Authorization: `Basic ${auth}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: "grant_type=client_credentials",
        });

        accessToken = response.data.access_token;
        tokenExpiration = Date.now() + response.data.expires_in * 1000; // expires_in is in seconds

        return accessToken;
    } catch (error) {
        console.error("Error getting PayPal access token:", error);
        throw new Error("Failed to get PayPal access token");
    }
}

// Create a new PayPal order (for one-time donations)
exports.createPayPalOrder = async (amount, project_id) => {
    const accessToken = await getPayPalAccessToken();
    const url = `${PAYPAL_API}/v2/checkout/orders`;

    const requestBody = {
        intent: "CAPTURE",
        purchase_units: [
            {
                reference_id: project_id,
                amount: {
                    currency_code: "USD", // Or your desired currency
                    value: amount,
                },
            },
        ],
        application_context: {
            return_url: `${BASE_URL}/donation/capture`,
            cancel_url: `${BASE_URL}/donation/cancel`,
        },
    };

    try {
        const response = await axios.post(url, requestBody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "PayPal-Request-Id": uuidv4(),
            },
        });

        return response.data.id;
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        throw new Error("Failed to create PayPal order");
    }
};

// Capture a PayPal order (for one-time donations)
exports.capturePayPalOrder = async (orderId) => {
    const accessToken = await getPayPalAccessToken();
    const url = `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`;

    try {
        const response = await axios.post(url, {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
                "PayPal-Request-Id": uuidv4(), // Ensure this is a unique ID
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error capturing PayPal order:", error);
        throw new Error("Failed to capture PayPal order");
    }
};

exports.createSubscriptionPlan = async (amount, interval, project_id) => {
    const planId = uuidv4(); // Generate a unique ID for the plan

    const requestBody = {
        plan_id: planId,
        product_id: project_id, // Using project_id as the product ID
        name: `Monthly Donation Plan for ${project_id}`,
        description: "Monthly recurring donation",
        status: "ACTIVE",
        billing_cycles: [
            {
                frequency: {
                    interval_unit: interval.toUpperCase(),
                    interval_count: 1,
                },
                tenure_type: "REGULAR",
                sequence: 1,
                total_cycles: 0, // 0 for infinite recurring payments
                pricing_scheme: {
                    fixed_price: {
                        value: amount,
                        currency_code: "USD",
                    },
                },
            },
        ],
        payment_preferences: {
            auto_bill_outstanding: true,
            setup_fee_failure_action: "CONTINUE",
            payment_failure_threshold: 3,
        },
    };

    try {
        const response = await axios.post(
            `${PAYPAL_API}/v1/billing/plans`,
            requestBody,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getPayPalAccessToken()}`,
                    "PayPal-Request-Id": uuidv4(),
                },
            }
        );
        console.log("Subscription plan created:", response.data);
        return response.data.id; // Return the created plan ID
    } catch (error) {
        console.error("Error creating subscription plan:", error.response.data);
        throw new Error("Failed to create subscription plan");
    }
};

exports.getSubscriptionApprovalLink = async (planId) => {
    try {
        const response = await axios.post(
            `${PAYPAL_API}/v1/billing/subscriptions`,
            {
                plan_id: planId,
                application_context: {
                    return_url: `${BASE_URL}/donation/subscription/success`,
                    cancel_url: `${BASE_URL}/donation/subscription/cancel`, // Update cancel URL
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getPayPalAccessToken()}`,
                },
            }
        );
        // Find the approval link from the response
        const approvalLink = response.data.links.find(
            (link) => link.rel === "approve"
        ).href;
        return approvalLink;
    } catch (error) {
        console.error("Error creating subscription:", error);
        throw new Error("Failed to create subscription");
    }
};