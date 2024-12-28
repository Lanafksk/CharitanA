const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("../../database/connection");

const clusterURI = process.env.MONGO_URI;
const db = connectDB("donationDB", clusterURI);

const donationSchema = new mongoose.Schema(
    {
        donation_id: { type: String, default: uuidv4, unique: true },
        donor_id: { type: String, required: false }, // Null for guest donors
        project_id: { type: String, required: true }, // Reference to the project
        amount: { type: Number, required: true }, // Donation amount
        currency: { type: String, default: "USD" }, // Fixed to USD
        payment_method: { type: String, enum: ["paypal", "card"], required: true }, // Payment type
        message: { type: String, maxLength: 250 }, // Optional donor message
        status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" }, // Payment status
        is_recurring: { type: Boolean, default: false }, // Recurring donation flag
        recurring_details: {
            interval: { type: String, enum: ["monthly", "weekly", "yearly"], default: null }, // Recurrence interval
            next_payment_date: { type: Date, default: null }, // Next recurring payment date
        },
        payment_gateway_response: { type: Object }, // Raw response from PayPal or card processor
    },
    { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

const Donation = db.model("Donation", donationSchema);
module.exports = Donation;
