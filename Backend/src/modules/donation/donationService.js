const donationRepository = require("./donationRepository");
const projectRepository = require('../project/projectRepository');

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
exports.getLeaderboard = async (
    timePeriod,
    year,
    month,
    startDate,
    endDate,
    sortBy,
    sortOrder
) => {
    console.log("Fetching leaderboard (simplified)");
    try {
        let start, end;

        // Same date filtering logic as getAllDonations
        if (timePeriod === "year" && year) {
            start = new Date(year, 0, 1);
            end = new Date(year, 11, 31, 23, 59, 59, 999);
        } else if (timePeriod === "month" && year && month) {
            start = new Date(year, month - 1, 1);
            end = new Date(year, month, 0, 23, 59, 59, 999);
        } else if (timePeriod === "custom" && startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
        }

        // Call donationRepository.getLeaderboard with optional parameters
        const leaderboard = await donationRepository.getLeaderboard(
            start,
            end,
            sortBy,
            sortOrder
        );
        return leaderboard;
    } catch (error) {
        console.error("Error in donationService.getLeaderboard:", error);
        throw new Error(`Error fetching leaderboard: ${error.message}`);
    }
};

// Get all donations with optional sorting
exports.getAllDonations = async (
    timePeriod,
    year,
    month,
    startDate,
    endDate,
    sortBy,
    sortOrder
) => {
    try {
        let start, end;

        if (timePeriod === "year" && year) {
            start = new Date(year, 0, 1); // Start of the year
            end = new Date(year, 11, 31, 23, 59, 59, 999); // End of the year
        } else if (timePeriod === "month" && year && month) {
            start = new Date(year, month - 1, 1); // Start of the month
            end = new Date(year, month, 0, 23, 59, 59, 999); // End of the month
        } else if (timePeriod === "custom" && startDate && endDate) {
            start = new Date(startDate);
            end = new Date(endDate);
            end.setHours(23, 59, 59, 999); // Set end time to the end of the day
        }

        // Pass start, end, sortBy, and sortOrder to the repository
        const donations = await donationRepository.getAllDonations(
            start,
            end,
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

/**
 * Calculates the total amount of donations for a specific project.
 *
 * @param {string} projectId - The ID of the project.
 * @returns {Promise<number>} - The total donation amount for the project.
 */
exports.getTotalDonationsForProject = async (projectId) => {
    try {
        const totalAmount = await donationRepository.getTotalDonationsForProject(
            projectId
        );
        return totalAmount;
    } catch (error) {
        throw new Error(
            `Error getting total donation amount for project: ${error.message}`
        );
    }
};

// Get a list of donations for a specific charity
exports.getDonationsByCharityId = async (charityId, month, year) => {
    // 1. Get project IDs for the charity
    const projectIds = await projectRepository.getProjectIdsByCharityId(charityId);

    // 2. Use the repository function to get donations based on project IDs
    return await donationRepository.getDonationsByProjectIds(projectIds, month, year);
};

// Get the total number of projects for a specific charity
exports.getProjectCountByCharityId = async (charityId, month, year) => {
    return await donationRepository.getProjectCountByCharityId(charityId, month, year);
};

// Get the total donation amount for a specific charity
exports.getTotalDonationAmountByCharityId = async (charityId, month, year) => {
    // 1. Get project IDs for the charity
    const projectIds = await projectRepository.getProjectIdsByCharityId(charityId);

    // 2. Use the repository function to get the total amount based on project IDs
    return await donationRepository.getTotalDonationAmountByProjectIds(projectIds, month, year);
};