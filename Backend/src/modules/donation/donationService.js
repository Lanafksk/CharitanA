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
exports.getLeaderboard = async (timePeriod, sortBy, sortOrder) => {
    console.log(
        "Fetching leaderboard with:",
        timePeriod,
        sortBy,
        sortOrder
    ); // Log input parameters

    try {
        let startDate, endDate;

        // Set default values for all-time if no timePeriod is provided
        if (!timePeriod) {
            startDate = new Date(0); // Start of Unix epoch
            endDate = new Date(); // Current date
        } else {
            const now = new Date();
            switch (timePeriod) {
                case "month":
                    startDate = new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month
                    endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of current month
                    break;
                case "year":
                    startDate = new Date(now.getFullYear(), 0, 1); // First day of current year
                    endDate = new Date(now.getFullYear() + 1, 0, 0); // Last day of current year
                    break;
                default:
                    throw new Error("Invalid time period specified.");
            }
        }

        // Default sorting by totalAmount descending if not provided
        const sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = sortOrder === "asc" ? 1 : -1;
        } else {
            sortOptions["totalAmount"] = -1;
        }

        const leaderboard = await donationRepository.getLeaderboard(
            startDate,
            endDate,
            sortOptions
        );
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