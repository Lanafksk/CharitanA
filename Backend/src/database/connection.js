const mongoose = require('mongoose');

const connections = {}; // Object to store multiple database connections

/**
 * Connect to the MongoDB database.
 * @param {string} dbName - The name of the database to connect to.
 * @param {string} clusterURI - The URI of the MongoDB cluster.
 * @returns {Promise<mongoose.Connection>} - The mongoose connection object.
 */
const connectDB = (dbName, clusterURI) => {
    try {
        console.log(clusterURI);
        // Check if there's an existing connection for this dbName
        if (!connections[dbName]) {
            // Construct the full URI
            const dbURI = clusterURI.includes("?")
                ? clusterURI.replace("?", `${dbName}?`)  // Append dbName if query parameters exist
                : `${clusterURI}/${dbName}`;  // Append dbName directly if no query parameters

            console.log(`Connecting to database: ${dbURI}`);

            // Create a new connection
            connections[dbName] = mongoose.createConnection(dbURI)

            // Set up event listeners for success and error
            connections[dbName].on("connected", () =>
                console.log(`Successfully connected to the database: ${dbName}`)
            );

            connections[dbName].on("error", (err) =>
                console.error(`Error connecting to database ${dbName}:`, err)
            );
        }

        // Return the existing connection if already established
        return connections[dbName];
    } catch (err) {
        console.error('Error in connecting to MongoDB:', err);
        process.exit(1);  // Exit the process if connection fails
    }
};

module.exports = connectDB;