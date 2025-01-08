const donationRepository = require("./donationRepository");

// Get donation history for a specific donor
exports.getDonationHistoryByDonor = async (donorId) => {
    try {
        const donationHistory =
            await donationRepository.getDonorDonationHistory(donorId);
        return donationHistory;
    } catch (error) {
        throw new Error(
            `Error fetching donation history for donor: ${error.message}`
        );
    }
};

// Get the total donation amount for a specific donor
exports.getTotalDonationAmountByDonor = async (donorId) => {
    try {
        const totalAmount = await donationRepository.getTotalDonationAmount(
            donorId
        );
        return totalAmount;
    } catch (error) {
        throw new Error(
            `Error getting total donation amount for donor: ${error.message}`
        );
    }
};

// Get the total number of projects a donor has participated in
exports.getTotalProjectsParticipatedByDonor = async (donorId) => {
    try {
        const totalProjects =
            await donationRepository.getTotalProjectsParticipated(donorId);
        return totalProjects;
    } catch (error) {
        throw new Error(
            `Error getting total projects participated in for donor: ${error.message}`
        );
    }
};

// Get the leaderboard with optional time period and sort order
exports.getLeaderboard = async () => {
    console.log("Fetching leaderboard (simplified)");

    try {
        const leaderboard = await donationRepository.getLeaderboard();
        return leaderboard;
    } catch (error) {
        console.error("Error in donationService.getLeaderboard:", error);
        throw new Error(`Error fetching leaderboard: ${error.message}`);
    }
};

exports.getAllDonations = async (sortBy, sortOrder) => {
    try {
        const donations = await donationRepository.getAllDonations(
            sortBy,
            sortOrder
        );
        return donations;
    } catch (error) {
        throw new Error(`Error fetching all donations: ${error.message}`);
    }
};

// Get a donation by ID
exports.getDonationById = async (donationId) => {
    try {
        const donation = await donationRepository.getDonationById(donationId);
        return donation;
    } catch (error) {
        throw new Error(`Error fetching donation by ID: ${error.message}`);
    }
};

// Create a new donation
exports.createDonation = async (donationData) => {
    try {
        // Set the status to "completed" if it's not provided
        if (!donationData.status) {
            donationData.status = "completed";
        }

        const donation = await donationRepository.createDonation(donationData);
        return donation;
    } catch (error) {
        console.error("Error creating donation:", error);
        throw new Error(`Error creating donation: ${error.message}`);
    }
};