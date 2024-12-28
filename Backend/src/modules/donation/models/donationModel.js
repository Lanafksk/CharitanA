const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("../../database/connection");

const clusterURI = process.env.MONGO_URI;
const db = connectDB("donationDB", clusterURI);

const donationSchema = new mongoose.Schema(
    {
        donation_id: { type: String, default: uuidv4, unique: true }, // Unique identifier for the donation
        donor_id: { type: String, required: false }, // Nullable; links to donor, null for guest donations
        project_id: { type: String, required: true }, // ID of the project being donated to
        amount: { type: Number, required: true }, // Amount donated
        currency: { type: String, default: "USD" }, // Fixed to USD
        payment_method: { type: String, enum: ["paypal", "card"], required: true }, // Payment method
        message: { type: String, maxLength: 250 }, // Optional message from the donor
        status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }, // Status of the donation
        is_recurring: { type: Boolean, default: false }, // Indicates if the donation is recurring
        recurring_details: {
            interval: { type: String, enum: ["monthly", "weekly", "yearly"], default: null }, // Interval of recurrence
            next_payment_date: { type: Date, default: null }, // Date for the next scheduled payment
        },
        payment_gateway_response: { type: Object }, // Raw response from PayPal or card processor
    },
    { timestamps: true } // Automatically include createdAt and updatedAt fields
);

// Indexes for optimized queries
donationSchema.index({ donor_id: 1 }); // For donor-based queries
donationSchema.index({ project_id: 1 }); // For project-based queries
donationSchema.index({ status: 1 }); // For filtering by payment status
donationSchema.index({ is_recurring: 1 }); // For recurring donation queries

const Donation = db.model("Donation", donationSchema);
module.exports = Donation;
