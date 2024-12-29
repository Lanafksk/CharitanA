const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("../../database/connection");

// Connect to the database
const clusterURI = process.env.MONGO_URI;
const db = connectDB("donationDB", clusterURI);

// Schema for the donation collection
const donationSchema = new mongoose.Schema(
    {
        donation_id: { type: String, default: uuidv4, unique: true }, // Unique ID for each donation
        donor_id: { type: String, required: false }, // Nullable for guest donors
        project_id: { type: String, required: true }, // Project the donation supports
        amount: { type: Number, required: true }, // The amount donated
        currency: { type: String, default: "USD" }, // Fixed to USD for simplicity
        payment_method: { type: String, enum: ["paypal", "card"], required: true }, // Payment method (PayPal or Card)
        message: { type: String, maxLength: 250 }, // Optional message from the donor
        status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }, // Donation status
        is_recurring: { type: Boolean, default: false }, // Indicates if the donation is recurring
        recurring_details: {
            interval: { type: String, enum: ["monthly", "weekly", "yearly"], default: null }, // Recurrence interval (if applicable)
            next_payment_date: { type: Date, default: null }, // Next payment date for recurring donations
        },
        payment_gateway_response: { type: Object }, // Raw response from PayPal or card processor
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

// Indexing frequently queried fields to improve performance
donationSchema.index({ donor_id: 1 });
donationSchema.index({ project_id: 1 });
donationSchema.index({ status: 1 });
donationSchema.index({ is_recurring: 1 });

const Donation = db.model("Donation", donationSchema);
module.exports = Donation;
