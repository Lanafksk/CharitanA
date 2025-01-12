require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Donation = require('../modules/donation/donationModel');
const connectDB = require('../database/connection');

// Connect to MongoDB Atlas
const db = connectDB('donationDB', process.env.MONGO_URI);

db.on("connected", () => {
    console.log("Successfully connected to MongoDB Atlas for generating data");
});

db.on("error", (err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
});

async function generateDonation(donorId, projectId, minAmount = 5, maxAmount = 500) {
    const now = new Date();
    const startOfYear = new Date(2024, 0, 1); // Start of 2024
    const endOfYear = new Date(2024, 11, 31, 23, 59, 59); // End of 2024

    return {
        donation_id: faker.string.uuid(),
        donor_id: donorId,
        project_id: projectId,
        amount: faker.number.float({ min: minAmount, max: maxAmount, precision: 0.01 }), // Use minAmount and maxAmount variables
        currency: 'USD',
        payment_method: 'paypal',
        message: faker.lorem.sentence(),
        status: 'completed',
        is_recurring: false, // You can modify this if needed
        recurring_details: {
            interval: 'MONTHLY',
            next_payment_date: faker.date.future({ years: 1 }), // Within the next year
        },
        payment_gateway_response: {},
        payment_id: faker.string.uuid(),
        createdAt: faker.date.between({ from: startOfYear, to: now }), // Use startOfYear and endOfYear variables
        updatedAt: faker.date.between({ from: startOfYear, to: now })
    };
}

async function generateDonations(donorIds, projectIds, numDonations) {
    const donations = [];
    for (let i = 0; i < numDonations; i++) {
        const donorId = faker.helpers.arrayElement(donorIds);
        const projectId = faker.helpers.arrayElement(projectIds);
        const donation = await generateDonation(donorId, projectId);
        donations.push(donation);
    }
    return donations;
}

async function insertDonations(donations) {
    try {
        await Donation.insertMany(donations);
        console.log(`${donations.length} donations inserted successfully!`);
    } catch (error) {
        console.error('Error inserting donations:', error);
    } finally {
        mongoose.connection.close();
    }
}

async function run() {
    // ** Donor IDs **
    const donorIds = [
        "5b1ca516-0106-4b30-8238-5d76eee41281",
        "4b1c8f1e-9068-4ca3-89c5-99caf5e43f06",
        "7ffe29b2-f801-4638-a976-c7d00618e44f",
        "450ad87c-c006-4591-a618-ab7e5132bf86",
        "a5819123-3afc-469c-90f7-fd728229dae3",
        "f3e66ce6-f4ff-4d56-9242-eb345e68a339",
        "c52693aa-b1ad-4bc2-8989-ae9bf2b8513d",
        "db8e9888-bd45-4525-b4ba-5dbbb893f550",
        "07343e9e-6f04-42ba-bb2b-83d843f65d43",
        "45b54bf5-7e2e-44b2-b183-f12665d88423",
        "9e099d88-2bc2-4f08-8bd9-8a1e0a309017",
        "a1abe7d6-0329-4bd9-8ce5-f27d6fa9ed72",
        "bb78ae27-8a23-4ae0-aa6b-3e624bfc843e",
        "1c2a439f-5dd2-47b6-983f-22ff70dfc4ba",
        "136d2304-8b1b-499e-898d-f80726b33fb4",
        "4c1de830-d4bd-4805-ad6a-3bb37c19d0e3",
        "d344224f-1cb8-4ecc-b85d-fcd32c90cff8",
        "1b2f04cc-33e1-47d6-94c9-1fd0ba4d394d",
        "d87ed4b4-ef38-4016-b562-1c28d41585d1",
        "f2a1ea3b-15e3-46e3-b413-a84ef62fdbb3",
        "be547f3e-a154-4406-a5e6-5d2d58df82fa",
        "4dabd169-05ce-45c7-b4ce-ad0c14edfb84",
        "090a1262-c0cd-4663-9aa5-5dad3d363543",
        "7207d054-cb65-4ef3-a486-549a0d5c33b6",
        "85efd4b5-6d59-4e67-8ea3-3f72bd44a620",
        "992b4a76-4754-454c-83b7-9e17fed6ae95",
        "ba93e8f4-e07a-490c-b6e0-68045213c094",
        "dfd949c8-7abc-4398-917f-f98e2ed39e18",
        "c576686f-9cc0-4eaa-81d1-531851f39840",
        "ee48d290-a596-4a2f-a3be-609cfd923434",
        "a43e7388-758a-4361-854d-fa7296d976bf",
        "6d8f3ee7-4455-419e-89e0-55cd3682ec0b",
        "836fe2fa-0e2d-4af3-a111-2fca92f300a3",
        "788e9557-af85-4003-a210-7e66464af73e",
        "b4492729-90a5-4da7-8070-cb68551058cc"
    ];

    // ** Project IDs **
    const projectIds = [
        '17b462d1-caae-43d8-b8e9-7e5e6dcf1949',
        'b584d3d0-e4f5-41e2-9ec8-22e8b1b0cf10',
        '38e50a9d-ebaf-4655-8848-027cc8b17885',
        'eaba6600-d9a2-4df5-a606-7f5bf1995300',
        '73cfaffa-0e58-482b-9c37-f461dba83ecb',
        '0d39be1b-2217-4a00-90e9-7592f4026fc0',
        '63850ce0-7d18-43e0-95a9-77621aa09c7d'
    ];

    // ** Number of Donations to Generate **
    const numDonations = 50;  // You can change this

    // ** Amount Range (min and max) **
    const minAmount = 5;    // You can change this
    const maxAmount = 500;  // You can change this

    if (!donorIds.length || !projectIds.length) {
        console.error("Please provide at least one donor ID and one project ID.");
        process.exit(1);
    }

    const donations = await generateDonations(donorIds, projectIds, numDonations);
    await insertDonations(donations);
}

run();