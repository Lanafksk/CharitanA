const Donation = require("./donationModel");

exports.createDonation = async (donationData) => new Donation(donationData).save();

exports.updateDonationStatus = async (donationId, status, paymentResponse) =>
    Donation.findOneAndUpdate(
        { donation_id: donationId },
        { status, payment_gateway_response: paymentResponse },
        { new: true }
    );

exports.getDonationById = async (donationId) => Donation.findOne({ donation_id: donationId });

exports.getDonorHistory = async (donorId) =>
    Donation.find({ donor_id: donorId }).sort({ createdAt: -1 });

exports.getTotalDonations = async (donorId) => {
    const total = await Donation.aggregate([
        { $match: { donor_id: donorId, status: "completed" } },
        { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);
    return total.length > 0 ? total[0].totalAmount : 0;
};
