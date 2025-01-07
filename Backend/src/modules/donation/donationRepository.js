const Donation = require("./donationModel");
const axios = require("axios"); // Import axios for making HTTP requests

/**
 * Creates a new donation record in the database.
 *
 * @param {Object} donationData - The donation details to be saved.
 * @returns {Object} - The saved donation record.
 * @throws {Error} - If there is an error creating the donation.
 */
exports.createDonation = async (donationData) => {
    try {
        const donation = new Donation(donationData);
        return await donation.save();
    } catch (error) {
        throw new Error(`Error creating donation: ${error.message}`);
    }
};

/**
 * Updates the status and payment response of a donation.
 *
 * @param {String} donationId - The unique donation ID.
 * @param {String} status - The new status of the donation.
 * @param {Object} paymentResponse - The raw payment response from the gateway.
 * @returns {Object} - The updated donation record.
 * @throws {Error} - If there is an error updating the donation.
 */
exports.updateDonationStatus = async (donationId, status, paymentResponse) => {
    try {
        return await Donation.findOneAndUpdate(
            { donation_id: donationId },
            { status, payment_gateway_response: paymentResponse },
            { new: true }
        );
    } catch (error) {
        throw new Error(`Error updating donation status: ${error.message}`);
    }
};

/**
 * Fetches a donation record by its unique ID.
 *
 * @param {String} donationId - The unique donation ID.
 * @returns {Object} - The donation record.
 * @throws {Error} - If there is an error fetching the donation.
 */
exports.getDonationById = async (donationId) => {
    try {
        return await Donation.findOne({ donation_id: donationId });
    } catch (error) {
        throw new Error(`Error fetching donation by ID: ${error.message}`);
    }
};

/**
 * Fetches the donation history of a specific donor.
 *
 * @param {String} donorId - The donor's unique ID.
 * @returns {Array} - A list of donations made by the donor.
 * @throws {Error} - If there is an error fetching the donation history.
 */
exports.getDonorDonationHistory = async (donorId) => {
    try {
        return await Donation.find({
            donor_id: donorId,
            status: { $in: ["completed", "active-subscription"] },
        }).sort({
            createdAt: -1, // Sort by creation date in descending order (most recent first)
        });
    } catch (error) {
        throw new Error(
            `Error fetching donor donation history: ${error.message}`
        );
    }
};

/**
 * Calculates the total donation amount for a specific donor.
 *
 * @param {String} donorId - The donor's unique ID.
 * @returns {Number} - The total amount donated by the donor.
 * @throws {Error} - If there is an error calculating the total donation amount.
 */
exports.getTotalDonationAmount = async (donorId) => {
    try {
        const result = await Donation.aggregate([
            {
                $match: {
                    donor_id: donorId,
                    status: { $in: ["completed", "active-subscription"] }, // Include active subscriptions
                },
            },
            {
                $group: {
                    _id: null, // Group all matching documents together
                    totalAmount: { $sum: "$amount" }, // Calculate the sum of the 'amount' field
                },
            },
        ]);
        // If there are donations, return the total amount; otherwise, return 0
        return result.length > 0 ? result[0].totalAmount : 0;
    } catch (error) {
        throw new Error(
            `Error calculating total donation amount: ${error.message}`
        );
    }
};

/**
 * Calculates the total number of projects a donor has contributed to.
 *
 * @param {String} donorId - The donor's unique ID.
 * @returns {Number} - The total number of unique projects supported by the donor.
 * @throws {Error} - If there is an error calculating the total projects participated in.
 */
exports.getTotalProjectsParticipated = async (donorId) => {
    try {
        const projects = await Donation.distinct("project_id", {
            donor_id: donorId,
            status: { $in: ["completed", "active-subscription"] }, // Include active subscriptions
        });
        return projects.length;
    } catch (error) {
        throw new Error(
            `Error calculating total projects participated: ${error.message}`
        );
    }
};

/**
 * Finds a donation by the PayPal plan ID (used for handling recurring donation webhooks).
 *
 * @param {String} planId - The PayPal plan ID.
 * @returns {Object} - The donation record if found, otherwise null.
 * @throws {Error} - If there is an error finding the donation.
 */
exports.findDonationByPlanId = async (planId) => {
    try {
        return await Donation.findOne({
            "payment_gateway_response.plan_id": planId,
        });
    } catch (error) {
        throw new Error(`Error finding donation by plan ID: ${error.message}`);
    }
};

/**
 * Generates a leaderboard of donors based on their total donation amounts.
 *
 * @param {Date} startDate - The start date for the time period.
 * @param {Date} endDate - The end date for the time period.
 * @param {Number} sortDirection - The sort direction (-1 for descending, 1 for ascending).
 * @returns {Array} - An array of donor objects with their total donation amounts, sorted by total amount.
 * @throws {Error} - If there is an error fetching the leaderboard.
 */
exports.getLeaderboard = async () => {
    console.log("Fetching leaderboard from DB (simplified)");

    try {
        const aggregatedData = await Donation.aggregate([
            {
                $match: {
                    status: { $in: ["completed", "active-subscription"] },
                },
            },
            {
                $group: {
                    _id: "$donor_id",
                    totalAmount: { $sum: "$amount" },
                },
            },
            {
                $sort: { totalAmount: -1 }, // Sort by totalAmount descending
            },
            {
                $limit: 20,
            },
            {
                $project: {
                    _id: 0,
                    donorId: "$_id",
                    totalAmount: 1,
                },
            },
        ]);

        console.log("Aggregated data:", aggregatedData);

        return aggregatedData;
    } catch (error) {
        console.error("Error fetching leaderboard from DB:", error);
        throw new Error(
            `Error fetching leaderboard from DB: ${error.message}`
        );
    }
};


/**
 * Finds a donation by its associated payment ID.
 *
 * @param {String} paymentId - The ID of the payment associated with the donation.
 * @returns {Object} - The donation record if found, otherwise null.
 * @throws {Error} - If there is an error finding the donation.
 */
exports.findDonationByPaymentId = async (paymentId) => {
    return await Donation.findOne({ payment_id: paymentId });
};

/**
 * Updates a donation record in the database.
 *
 * @param {String} donationId - The ID of the donation to update.
 * @param {Object} updateData - An object containing the fields to update and their new values.
 * @returns {Object} - The updated donation record.
 * @throws {Error} - If there is an error updating the donation.
 */
exports.updateDonation = async (donationId, updateData) => {
    return await Donation.findOneAndUpdate({ donation_id: donationId }, updateData, { new: true });
};

// Fetch all donations with optional sorting
exports.getAllDonations = async (sortBy, sortOrder) => {
    try {
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1; // 1 for ascending, -1 for descending
        }

        const donations = await Donation.find().sort(sortOptions);
        return donations;
    } catch (error) {
        throw new Error(`Error fetching all donations: ${error.message}`);
    }
};

// Get a donation by ID
exports.getDonationById = async (donationId) => {
    try {
        const donation = await Donation.findOne({ donation_id: donationId });
        return donation;
    } catch (error) {
        throw new Error(`Error fetching donation by ID: ${error.message}`);
    }
};