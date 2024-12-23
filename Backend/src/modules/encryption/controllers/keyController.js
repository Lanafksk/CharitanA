const keyManagementService = require('../services/keyManagementService');
const encryptionService = require('../services/encryptionService');

exports.generateKeyPair = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        await keyManagementService.generateKeys(model, entityId);
        res.json({ message: "Keys generated successfully" });
    } catch (error) {
        console.error(error);
    }
}

exports.updateKeyPair = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        await keyManagementService.updateKeys(model, entityId);
        res.json({ message: "Keys updated successfully" });
    } catch (error) {
        console.error(error);
    }
}

exports.fetchPublicKey = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const publicKey = await keyManagementService.getPublicKey(model, entityId);
        res.json({ publicKey });
    } catch (error) {
        console.error(error);
    }
}

exports.fetchPrivateKey = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const privateKey = await keyManagementService.getPrivateKey(model, entityId);
        res.json({ privateKey });
    } catch (error) {
        console.error(error);
    }
}

exports.deleteKeyPair = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        await keyManagementService.deleteKeys(model, entityId);
        res.json({ message: "Keys deleted successfully" });
    } catch (error) {
        console.error(error);
    }
}

exports.encryptData = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const { data } = req.body;
        const encryptedData = await encryptionService.encryptData(model, data, entityId);
        res.json({ encryptedData });
    } catch (error) {
        console.error(error);
    }
}

exports.decryptData = async (req, res) => {
    try {
        const { model, entityId } = req.params;
        const { encryptedData } = req.body;
        const decryptedData = await encryptionService.decryptData(model, encryptedData, entityId);
        res.json({ decryptedData });
    } catch (error) {
        console.error(error);
    }
}