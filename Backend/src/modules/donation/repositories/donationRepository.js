const Donation = require("./donationModel");

exports.createDonation = async (donationData) => {
    try {
        const donation = new Donation(donationData);
        return await donation.save();
    } catch (error) {
        throw new Error(`Error creating donation: ${error.message}`);
    }
};

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

exports.getDonationById = async (donationId) => {
    try {
        return await Donation.findOne({ donation_id: donationId });
    } catch (error) {
        throw new Error(`Error fetching donation by ID: ${error.message}`);
    }
};

exports.getDonorDonationHistory = async (donorId) => {
    try {
        return await Donation.find({ donor_id: donorId, status: "completed" }).sort({ createdAt: -1 });
    } catch (error) {
        throw new Error(`Error fetching donation history: ${error.message}`);
    }
};

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

exports.getTotalProjectsParticipated = async (donorId) => {
    try {
        const projects = await Donation.distinct("project_id", { donor_id: donorId, status: "completed" });
        return projects.length;
    } catch (error) {
        throw new Error(`Error calculating total projects participated: ${error.message}`);
    }
};

// exports.getLeaderboard = async () => {
//     try {
//         return await Donation.aggregate([
//             { $match: { status: "completed" } },
//             { $group: { _id: "$donor_id", totalAmount: { $sum: "$amount" } } },
//             { $sort: { totalAmount: -1 } }, // Sort by total donation amount in descending order
//             { $limit: 10 }, // Top 10 donors
//             {
//                 $lookup: {
//                     from: "donors", // Assuming donor details are stored in a "donors" collection
//                     localField: "_id",
//                     foreignField: "donor_id",
//                     as: "donor_details",
//                 },
//             },
//             { $unwind: "$donor_details" }, // Flatten donor details
//             {
//                 $project: {
//                     donor_id: "$_id",
//                     totalAmount: 1,
//                     name: "$donor_details.name",
//                     email: "$donor_details.email",
//                 },
//             },
//         ]);
//     } catch (error) {
//         throw new Error(`Error fetching leaderboard: ${error.message}`);
//     }
// };
