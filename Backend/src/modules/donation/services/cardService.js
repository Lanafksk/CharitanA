const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * Processes a credit/debit card payment for a donation.
 * 
 * @param {Number} amount - The donation amount.
 * @param {Object} cardDetails - The card details from the donor (number, expiry, cvc).
 * @returns {Object} - The response from Stripe with payment intent details.
 */
exports.processCardPayment = async (amount, cardDetails) => {
    try {
        // Create a payment intent to process the card payment
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Amount in cents
            currency: "usd", // Fixed to USD
            payment_method_data: {
                type: "card",
                card: {
                    number: cardDetails.cardNumber,
                    exp_month: cardDetails.expiryMonth,
                    exp_year: cardDetails.expiryYear,
                    cvc: cardDetails.cvc,
                },
            },
            confirm: true,
        });
        return paymentIntent; // Return the payment intent details
    } catch (error) {
        throw new Error(`Card payment failed: ${error.message}`);
    }
};
