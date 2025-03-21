const crypto = require('crypto');
const PaymentKeyRepo = require('../repositories/paymentKeyRepository');
const AuthKeyRepo = require('../repositories/authKeyRepository');

/**
 * Generate a new key pair for a specific entity.
 * @param {String} model 
 * @param {String} entityId 
 * @returns {Object} The generated public and private keys.
 */
exports.generateKeys = async (model, entityId) => {
    // Generate a new RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: { type: "spki", format: "pem" },
        privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    // Identify the model to use (Payment or Authentication)
    let repoInstance;
    if (model === "payment") {
        repoInstance = PaymentKeyRepo;
    } else if (model === "auth") {
        repoInstance = AuthKeyRepo;
    } else {
        throw new Error("Invalid model");
    }

    // Save the key pair to the database
    const existingKey = await repoInstance.findEntity(entityId);
    existingKey ? console.log("Existing key found") : console.log("No existing key found");
    if (existingKey) {
        throw new Error(`Key already exists for entityId: ${entityId}`);
    } else {
        await repoInstance.saveKeys(entityId, publicKey, privateKey);
    }
    console.log("Created key pair");

    return { publicKey, privateKey };
}


/**
 * Retrieve a public key for a specific entity.
 * @param {String} model 
 * @param {String} entityId 
 * @returns {String} The public key.
 */
exports.getPublicKey = async (model, entityId) => {
    // Identify the model to use (Payment or Authentication)
    let repoInstance;

    if (model === "payment") {
        repoInstance = PaymentKeyRepo;
    } else if (model === "auth") {
        repoInstance = AuthKeyRepo;
    } else {
        throw new Error("Invalid model");
    }

    // Retrieve the public key from the database
    const public_key = await repoInstance.getPublicKey(entityId);
    if (public_key) {
        return public_key;
    }
    else {
        throw new Error(`No key found for entityId: ${entityId}`);
    }
}


/**
 * Retrieve a private key for a specific entity.
 * @param {String} model 
 * @param {String} entityId 
 * @returns {String} The private key.
 */
exports.getPrivateKey = async (model, entityId) => {
    // Identify the model to use (Payment or Authentication)
    let repoInstance;
    if (model === "payment") {
        repoInstance = PaymentKeyRepo;
    } else if (model === "auth") {
        repoInstance = AuthKeyRepo;
    } else {
        throw new Error("Invalid model");
    }

    const private_key = await repoInstance.getPrivateKey(entityId);
    if (private_key) {
        return private_key;
    } else {
        throw new Error(`No key found for model: ${model}, entityId: ${entityId}`);
    }
}

/**
 * Update the key pair for a specific entity.
 * @param {String} model 
 * @param {String} entityId 
 */
exports.updateKeys = async (model, entityId) => {
    // Generate a new RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: { type: "pkcs1", format: "pem" },
        privateKeyEncoding: { type: "pkcs1", format: "pem" },
    });

    // Identify the model to use (Payment or Authentication)
    let repoInstance;
    if (model === "payment") {
        repoInstance = PaymentKeyRepo;
    } else if (model === "auth") {
        repoInstance = AuthKeyRepo;
    } else {
        throw new Error("Invalid model");
    }

    // Update the key pair in the database
    const existingKey = await repoInstance.findEntity(entityId);
    if (existingKey) {
        await repoInstance.updateKeys(entityId, publicKey, privateKey);
    } else {
        throw new Error(`No key found for entityId: ${entityId}`);
    }
}

/**
 * Delete a key pair for a specific entity.
 * @param {String} model 
 * @param {String} entityId 
 */
exports.deleteKeys = async (model, entityId) => {
    // Identify the model to use (Payment or Authentication)
    let repoInstance;
    if (model === "payment") {
        repoInstance = PaymentKeyRepo;
    } else if (model === "auth") {
        repoInstance = AuthKeyRepo;
    } else {
        throw new Error("Invalid model");
    }

    // Delete the key pair from the database
    await repoInstance.deleteKeys(entityId);
}