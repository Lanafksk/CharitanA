const Donation = require("./donationModel");

/**
 * Creates a new donation record in the database.
 * 
 * @param {Object} donationData - The donation details.
 * @returns {Object} - The created donation document.
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
 * Updates the status and payment response of a specific donation.
 * 
 * @param {String} donationId - The unique donation ID.
 * @param {String} status - The new status of the donation.
 * @param {Object} paymentResponse - The raw response from the payment gateway.
 * @returns {Object} - The updated donation document.
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
 * @returns {Object} - The donation document.
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
 * @param {String} donorId - The unique donor ID.
 * @returns {Array} - A list of completed donations made by the donor.
 */
exports.getDonorDonationHistory = async (donorId) => {
    try {
        return await Donation.find({ donor_id: donorId, status: "completed" }).sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(`Error fetching donor donation history: ${error.message}`);
    }
};

/**
 * Calculates the total donation amount for a specific donor.
 * 
 * @param {String} donorId - The unique donor ID.
 * @returns {Number} - The total amount donated by the donor.
 */
exports.getTotalDonationAmount = async (donorId) => {
    try {
        const total = await Donation.aggregate([
            { $match: { donor_id: donorId, status: "completed" } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
        ]);
        return total.length > 0 ? total[0].totalAmount : 0;
    } catch (error) {
        throw new Error(`Error calculating total donation amount: ${error.message}`);
    }
};

/**
 * Calculates the total number of unique projects a donor has contributed to.
 * 
 * @param {String} donorId - The unique donor ID.
 * @returns {Number} - The total number of unique projects.
 */
exports.getTotalProjectsParticipated = async (donorId) => {
    try {
        const projects = await Donation.distinct("project_id", { donor_id: donorId, status: "completed" });
        return projects.length;
    } catch (error) {
        throw new Error(`Error calculating total projects participated: ${error.message}`);
    }
};
