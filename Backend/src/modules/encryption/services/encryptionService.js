const crypto = require('crypto');
const PaymentKeyRepo = require('../repositories/paymentKeyRepository');
const AuthKeyRepo = require('../repositories/authKeyRepository');

/**
 * Encrypt data using RSA public key
 * @param {string} data - The data to encrypt.
 * @param {string} entityId - The unique identifier for the entity.
 * @returns {Promise<string>} The encrypted data.
 */
exports.encryptData = async (model, data, entityId) => {
    try {
        // Identify the model to use (Payment or Authentication)
        let repoInstance;
        if (model === "payment") {
            repoInstance = PaymentKeyRepo;
        } else if (model === "auth") {
            repoInstance = AuthKeyRepo;
        } else {
            throw new Error("Invalid model");
        }
        
        console.log("Identified model");
        
        // Save the key pair to the database
        const existingKey = await repoInstance.findEntity(entityId);
        existingKey ? console.log("Existing key found") : console.log("No existing key found");
        if (existingKey) {
            
        } else {
            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: { type: "pkcs1", format: "pem" },
                privateKeyEncoding: { type: "pkcs1", format: "pem" },
            });

            // Save the new key pair to the database
            keyPair = await repoInstance.saveKeys(entityId, publicKey, privateKey);
        }

        publicKey = existingKey.public_key;
        // Step 2: Encrypt data with the public key
        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            },
            Buffer.from(data)
        );

        // Return encrypted data as a base64 string
        return encryptedData.toString('base64');
    } catch (error) {
        throw new Error(`Encryption failed: ${error.message}`);
    }
};

/**
 * Decrypt data using RSA private key
 * @param {string} encryptedData - The encrypted data to decrypt (base64 encoded).
 * @param {string} entityId - The unique identifier for the entity.
 * @returns {Promise<string>} The decrypted data.
 */
exports.decryptData = async (model, encryptedData, entityId) => {
    try {
        // Identify the model to use (Payment or Authentication)
        let repoInstance;
        if (model === "payment") {
            repoInstance = PaymentKeyRepo;
        } else if (model === "auth") {
            repoInstance = AuthKeyRepo;
        } else {
            throw new Error("Invalid model");
        }

        console.log("Identified model");

        // Save the key pair to the database
        const existingKey = await repoInstance.findEntity(entityId);
        existingKey ? console.log("Existing key found") : console.log("No existing key found");
        if (existingKey) {
        } else {
            throw new Error(`No key found for entityId: ${entityId}`);
        }

        private_key = existingKey.private_key;

        // Step 2: Decrypt the data with the private key
        const decryptedData = crypto.privateDecrypt(
            {
                key: private_key,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            },
            Buffer.from(encryptedData, 'base64')
        );

        // Return decrypted data as a string
        return decryptedData.toString('utf8');
    } catch (error) {
        throw new Error(`Decryption failed: ${error.message}`);
    }
};