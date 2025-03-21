const { v4: uuidv4 } = require('uuid');
const connectDB = require('../../database/connection');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
const clusterURI = process.env.MONGO_URI;

// Connect to respective Database
const db = connectDB('donationDB', clusterURI);

// Define the Donation Schema
const donationSchema = new mongoose.Schema(
    {
        // Unique identifier for each donation (generated automatically using uuidv4)
        donation_id: {
            type: String,
            default: uuidv4,
            unique: true,
        },
        // Donor ID (can be null initially, especially for guest donations or
        // subscriptions)
        donor_id: {
            type: String,
            required: false, // Allow null values for now
        },
        // Project ID (references the Project model)
        project_id: {
            type: String,
            required: true,
            ref: "Project", // This creates a relationship with the 'Project' model
        },
        // Donation amount
        amount: {
            type: Number,
            required: true,
        },
        // Currency (fixed to USD for now, but you can make it dynamic)
        currency: {
            type: String,
            default: "USD",
        },
        // Payment method (only "paypal" for now)
        payment_method: {
            type: String,
            enum: ["paypal", "card"],
            required: true,
        },
        // Optional message from the donor
        message: {
            type: String,
            maxLength: 250,
        },
        // Donation status
        status: {
            type: String,
            enum: [
                "pending", // Initial status when the donation is created
                "completed", // For one-time donations after successful capture
                "failed", // If payment capture or subscription creation fails
                "active-subscription", // For active subscriptions
                // You can add more statuses as needed (e.g., "refunded", "suspended")
            ],
            default: "pending",
        },
        // Indicates if the donation is recurring
        is_recurring: {
            type: Boolean,
            default: false,
        },
        // Details for recurring donations (if applicable)
        recurring_details: {
            interval: {
                type: String,
                enum: ["MONTHLY"], // Initially, only monthly subscriptions are supported
            },
            next_payment_date: {
                type: Date,
            },
        },
        // Store responses from the payment gateway (PayPal)
        payment_gateway_response: {
            type: Object, // Can store various details like order ID, subscription ID, plan ID, etc.
        },
        payment_id: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt timestamps
    }
);

// Indexes for optimized queries:
// Index for donor-related queries (e.g., fetching a donor's donation history)
donationSchema.index({ donor_id: 1 });

// Index for project-related queries (e.g., fetching all donations for a project)
donationSchema.index({ project_id: 1 });

// Index for project-related and status queries
donationSchema.index({ project_id: 1, status: 1 });

// Index for filtering by payment status (e.g., finding all completed donations)
donationSchema.index({ status: 1 });

// Index for recurring donation queries (e.g., finding active subscriptions)
donationSchema.index({ is_recurring: 1 });

// Index for finding a donation by PayPal plan ID (useful for webhook handling)
donationSchema.index({ "payment_gateway_response.plan_id": 1 });

// Create the Donation model using the schema and the specific database connection
const Donation = db.model("Donation", donationSchema);

// Export the Donation model
module.exports = Donation;