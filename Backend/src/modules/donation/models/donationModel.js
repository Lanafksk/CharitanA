const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const connectDB = require("../../database/connection");

const clusterURI = process.env.MONGO_URI;
const db = connectDB("donationDB", clusterURI);

const donationSchema = new mongoose.Schema(
    {
        donation_id: { type: String, default: uuidv4, unique: true },
        donor_id: { type: String, required: false }, // Null for guest donors
        project_id: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, default: "USD" },
        message: { type: String, maxLength: 250 },
        status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
        is_recurring: { type: Boolean, default: false },
        payment_gateway_response: { type: Object },
    },
    { timestamps: true }
);

const Donation = db.model("Donation", donationSchema);
module.exports = Donation;
