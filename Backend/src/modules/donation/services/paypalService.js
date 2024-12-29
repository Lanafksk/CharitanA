const paypal = require("@paypal/checkout-server-sdk");

// Set up PayPal SDK client
const client = new paypal.core.PayPalHttpClient(
    new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
    )
);

/**
 * Creates a PayPal order for the donation.
 * 
 * @param {Number} amount - The amount for the donation.
 * @param {String} project_id - The ID of the project being donated to.
 * @returns {String} - PayPal Order ID.
 */
exports.createPayPalOrder = async (amount, project_id) => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD", // Fixed to USD
                    value: amount,
                },
                description: `Donation for Project ${project_id}`,
            },
        ],
    });

    // Send the request to PayPal to create an order
    const response = await client.execute(request);
    return response.result.id; // Return the PayPal Order ID
};

/**
 * Captures a PayPal order after approval by the donor.
 * 
 * @param {String} orderId - The PayPal Order ID.
 * @returns {Object} - The response from PayPal with payment details.
 */
exports.capturePayPalOrder = async (orderId) => {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    const response = await client.execute(request);
    return response.result; // Capture and return the response from PayPal
};
