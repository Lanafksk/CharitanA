const paypal = require("@paypal/checkout-server-sdk");

// Setting up environment
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const environment = new paypal.core.SandboxEnvironment(
    clientId,
    clientSecret
);
const client = new paypal.core.PayPalHttpClient(environment);

exports.createOrder = async (paymentData) => {
    console.log("Creating PayPal order with data:", paymentData);
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
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
                    email_address: paymentData.charityPaypalEmail,
                },
            },
        ],
        application_context: {
            return_url: `${process.env.TEAM_A_BASE_URL}/api/payments/capture`,
            cancel_url: `${process.env.TEAM_A_BASE_URL_FRONTEND}/payment-cancelled`,
            brand_name: process.env.YOUR_CHARITY_NAME,
            locale: "en-US",
            landing_page: "BILLING",
            shipping_preference: "NO_SHIPPING",
            user_action: "CONTINUE",
        },
    });

    try {
        const order = await client.execute(request);
        console.log("PayPal order created:", order.result);

        const orderId = order.result.id;
        const approvalUrl = order.result.links.find(
            (link) => link.rel === "approve"
        ).href;

        return { orderId, approvalUrl };
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        throw new Error(error.message);
    }
};

exports.capturePayment = async (orderId) => {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await client.execute(request);

        console.log("PayPal payment captured:", capture.result);

        return capture.result;
    } catch (error) {
        console.error("Error capturing PayPal payment:", error);
        throw new Error("Failed to capture PayPal payment");
    }
};