const donationService = require("./donationService");

// Get donation history for a specific donor
exports.getDonationHistoryByDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId;
        const donationHistory =
            await donationService.getDonationHistoryByDonor(donorId);
        res.status(200).json(donationHistory);
    } catch (err) {
        console.error("Error getting donation history by donor:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get the total donation amount for a specific donor
exports.getTotalDonationAmountByDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId;
        const totalAmount = await donationService.getTotalDonationAmountByDonor(
            donorId
        );
        res.status(200).json({ totalAmount });
    } catch (err) {
        console.error("Error getting total donation amount by donor:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get the total number of projects a donor has participated in
exports.getTotalProjectsParticipatedByDonor = async (req, res) => {
    try {
        const donorId = req.params.donorId;
        const totalProjects =
            await donationService.getTotalProjectsParticipatedByDonor(donorId);
        res.status(200).json({ totalProjects });
    } catch (err) {
        console.error("Error getting total projects participated by donor:", err);
        res.status(500).json({ error: err.message });
    }
};

// Get a list of donors with their total donation amounts (for leaderboard)
exports.getLeaderboard = async (req, res) => {
    try {
        const { timePeriod, sortBy, sortOrder } = req.query; // Add timePeriod to query params
        const leaderboard = await donationService.getLeaderboard(
            timePeriod,
            sortBy,
            sortOrder
        );
        res.status(200).json(leaderboard);
    } catch (err) {
        console.error("Error getting leaderboard:", err);
        res.status(500).json({ error: err.message });
    }
};

// Fetch all donations with optional sorting
exports.getAllDonations = async (req, res) => {
    try {
        const { sortBy, sortOrder } = req.query; // Get sort parameters from query string
        const donations = await donationService.getAllDonations(
            sortBy,
            sortOrder
        );
        res.status(200).json(donations);
    } catch (error) {
        console.error("Error getting all donations:", error);
        res.status(500).json({ error: error.message });
    }
};

// Get a donation by ID
exports.getDonationById = async (req, res) => {
    try {
        const donationId = req.params.donationId;
        const donation = await donationService.getDonationById(donationId);
        if (!donation) {
            return res.status(404).json({ message: "Donation not found" });
        }
        res.status(200).json(donation);
    } catch (error) {
        console.error("Error getting donation by ID:", error);
        res.status(500).json({ error: error.message });
    }
};