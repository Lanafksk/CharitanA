const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Get the MongoDB connection URI from environment variables
const clusterURI = process.env.MONGO_URI;

// Connect to the "charitan" database using mongoose.createConnection()
const db = mongoose.createConnection(clusterURI);

db.on("connected", () => {
    console.log("Successfully connected to the database: charitan/payment  ");
});

db.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
});

// Define the Payment Schema
const paymentSchema = new mongoose.Schema(
    {
        payment_id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        donation_id: {
            type: String,
            ref: "Donation",
            required: false, // Can be null initially
        },
        donor_id: {
            type: String,
            required: false, // Can be null for guest donations
        },
        project_id: {
            type: String,
            required: true,
            ref: "Project"
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "USD",
        },
        payment_method: {
            type: String,
            enum: ["paypal"], // Only "paypal" for now
            required: true,
        },
        status: {
            type: String,
            enum: [
                "pending",
                "completed",
                "failed",
                "cancelled",
                "active-subscription", // For recurring payments
                "inactive-subscription", // For recurring payments
            ],
            default: "pending",
        },
        payment_gateway_response: {
            type: Object, // Store relevant data from PayPal's responses
        },
        is_recurring: {
            type: Boolean,
            default: false,
        },
        recurring_details: {
            type: Object,
            default: () => ({}), // Set default as an empty object
            interval: {
                type: String,
                enum: ["MONTHLY"],
            },
            subscription_id: {
                type: String,
            },
            next_payment_date: {
                type: Date,
            },
        },
    },
    {
        timestamps: true,
    }
);

const Payment = db.model("Payment", paymentSchema);

module.exports = Payment;