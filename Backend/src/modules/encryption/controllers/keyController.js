const keyManagementService = require('../services/keyManagementService');
const encryptionService = require('../services/encryptionService');

/**
 * Generate a new key pair for a specific entity.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.generateKeyPair = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        await keyManagementService.generateKeys(model, entityId);
        res.json({ message: "Keys generated successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

/**
 * Fetch the public key for a specific entity.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.fetchPublicKey = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const publicKey = await keyManagementService.getPublicKey(model, entityId);
        res.json({ publicKey });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

/**
 * Fetch the private key for a specific entity.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.fetchPrivateKey = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const privateKey = await keyManagementService.getPrivateKey(model, entityId);
        res.json({ privateKey });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

/**
 * Update the key pair for a specific entity.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.updateKeyPair = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        await keyManagementService.updateKeys(model, entityId);
        res.json({ message: "Keys updated successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

/**
 * Delete the key pair for a specific entity.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.deleteKeyPair = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        await keyManagementService.deleteKeys(model, entityId);
        res.json({ message: "Keys deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

/**
 * Encrypt data for a specific entity.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.encryptData = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const { data } = req.body;
        const encryptedData = await encryptionService.encryptData(model, data, entityId);
        res.json({ encryptedData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

/**
 * Decrypt data for a specific entity.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.decryptData = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const { encryptedData } = req.body;
        const decryptedData = await encryptionService.decryptData(model, encryptedData, entityId);
        res.json({ decryptedData });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}