const Donation = require("../models/donationModel");

/**
 * Creates a new donation record in the database.
 *
 * @param {Object} donationData - The donation details to be saved.
 * @returns {Object} - The saved donation record.
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
 */
exports.getDonorDonationHistory = async (donorId) => {
    try {
        return await Donation.find({ donor_id: donorId, status: { $in: ["completed", "active-subscription"] } }).sort({
            createdAt: -1,
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
                    _id: null,
                    totalAmount: { $sum: "$amount" },
                },
            },
        ]);

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

exports.findDonationByPlanId = async (planId) => {
    try {
        return await Donation.findOne({
            "payment_gateway_response.plan_id": planId,
        });
    } catch (error) {
        throw new Error(`Error finding donation by plan ID: ${error.message}`);
    }
};

// Add aggregation for leaderboard
exports.getLeaderboard = async () => {
    try {
        return await Donation.aggregate([
            {
                $match: {
                    status: { $in: ["completed", "active-subscription"] } // Include donations from active subscriptions
                }
            },
            {
                $group: {
                    _id: "$donor_id",
                    totalAmount: { $sum: "$amount" }
                }
            },
            {
                $lookup: {
                    from: "users", //'users' collection in team B database
                    localField: "_id",
                    foreignField: "user_id", // Assuming 'user_id' is the field in 'users' collection that corresponds to 'donor_id'
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true // Preserve donors who might not have a corresponding user record
                }
            },
            {
                $project: {
                    _id: 0, // Exclude the _id field
                    donorId: "$_id",
                    donorName: { $ifNull: ["$user.username", "Unknown Donor"] }, // Replace with actual field from 'users' collection
                    totalAmount: 1
                }
            },
            {
                $sort: { totalAmount: -1 }
            },
            {
                $limit: 10
            }
        ]);
    } catch (error) {
        throw new Error(`Error fetching leaderboard: ${error.message}`);
    }
};