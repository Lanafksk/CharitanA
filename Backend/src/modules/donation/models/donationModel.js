const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("../../database/connection");

const clusterURI = process.env.MONGO_URI;
const db = connectDB("donationDB", clusterURI);

const donationSchema = new mongoose.Schema(
    {
        donation_id: { type: String, default: uuidv4, unique: true }, // Unique identifier for each donation
        donor_id: { type: String, required: false }, // Nullable; links to a specific donor or null for guests
        project_id: { type: String, required: true }, // The project associated with the donation
        amount: { type: Number, required: true }, // The donation amount
        currency: { type: String, default: "USD" }, // Fixed to USD
        payment_method: { type: String, enum: ["paypal", "card"], required: true }, // The payment method used
        message: { type: String, maxLength: 250 }, // Optional message from the donor
        status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }, // Payment status
        is_recurring: { type: Boolean, default: false }, // Indicates whether the donation is recurring
        recurring_details: {
            interval: { type: String, enum: ["monthly", "weekly", "yearly"], default: null }, // Recurrence interval
            next_payment_date: { type: Date, default: null }, // The date for the next recurring donation
        },
        payment_gateway_response: { type: Object }, // Raw response from the payment gateway (e.g., PayPal, Stripe)
    },
    { timestamps: true } // Automatically includes createdAt and updatedAt fields
);

// Indexes for optimized queries
donationSchema.index({ donor_id: 1 }); // For donor-related queries
donationSchema.index({ project_id: 1 }); // For project-related queries
donationSchema.index({ status: 1 }); // For filtering by payment status
donationSchema.index({ is_recurring: 1 }); // For recurring donation queries

const Donation = db.model("Donation", donationSchema);
module.exports = Donation;
