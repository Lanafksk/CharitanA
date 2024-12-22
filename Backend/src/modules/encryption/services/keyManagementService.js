const crypto = require('crypto');
const PaymentKeyRepo = require('../repositories/paymentKeyRepository');
const AuthKeyRepo = require('../repositories/authKeyRepository');

// Generate a key pair for a specific entity
exports.generateKeys = async (model, entityId) => {
    // Generate a new RSA key pair
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 2048,
        publicKeyEncoding: { type: "pkcs1", format: "pem" },
        privateKeyEncoding: { type: "pkcs1", format: "pem" },
    });

    console.log("Generated keys");
    

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
        throw new Error(`Key already exists for entityId: ${entityId}`);
    } else {
        await repoInstance.saveKeys(entityId, publicKey, privateKey);
    }
    console.log("Created key pair");

    return { publicKey, privateKey };
}

// Update a key pair for a specific entity
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

// Retrieve a public key for a specific entity
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

// Retrieve a private key for a specific entity
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

// Delete a key pair for a specific entity
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