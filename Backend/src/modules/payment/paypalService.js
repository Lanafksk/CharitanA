const axios = require("axios");

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_URL } = process.env;

async function getPaypalAccessToken() {
    const auth = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
    ).toString("base64");

    try {
        const response = await axios.post(
            `${PAYPAL_API_URL}/v1/oauth2/token`,
            "grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.error("Error getting PayPal access token:", error);
        throw new Error("Failed to get PayPal access token");
    }
}

exports.createOrder = async (paymentData) => {
    const accessToken = await getPaypalAccessToken();

    const orderData = {
        intent: "CAPTURE",
        purchase_units: [
            {
                reference_id: paymentData.project_id,
                amount: {
                    currency_code: paymentData.currency,
                    value: paymentData.amount.toFixed(2),
                },
                description: paymentData.message || "Donation to Charity",
                note_to_payer: paymentData.message,
                payee: {
                    // Use either email address or merchant ID, not both
                    email_address: paymentData.charityPaypalEmail, // Preferred if available
                    // merchant_id: paymentData.charityPaypalMerchantId // Alternative, but not both
                },
            },
        ],
        application_context: {
            return_url: `${process.env.YOUR_BASE_URL}/api/payments/capture`, // Replace with your actual URL
            cancel_url: `${process.env.YOUR_BASE_URL}/api/payments/cancel`, // Replace with your actual URL
        },
    };

    try {
        const response = await axios.post(
            `${PAYPAL_API_URL}/v2/checkout/orders`,
            orderData,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        // Extract the order ID and approval URL from the response
        const orderId = response.data.id;
        const approvalUrl = response.data.links.find(
            (link) => link.rel === "approve"
        ).href;

        return { orderId, approvalUrl };
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        if (error.response) {
            console.error("PayPal API response data:", error.response.data);
        }
        throw new Error("Failed to create PayPal order");
    }
};

exports.capturePayment = async (orderId) => {
    const accessToken = await getPaypalAccessToken();

    try {
        const response = await axios.post(
            `${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error capturing PayPal payment:", error);
        if (error.response) {
            console.error("PayPal API response data:", error.response.data);
        }
        throw new Error("Failed to capture PayPal payment");
    }
};