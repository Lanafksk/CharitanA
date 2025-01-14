const jweService = require('../services/jweService');

/**
 * Encrypt a JWS token using JWE and return the encrypted token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.encryptUsingJWE = async (req, res) => {
    const { jws, entityId } = req.body;

    if (!jws || !entityId) {
        return res.status(400).send({ error: 'JWS and entityId are required' });
    }

    try {
        const encryptedToken = await jweService.encryptJWE(jws, entityId);
        res.status(200).send({ encryptedToken });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

/**
 * Decrypt a JWE token and return the original JWS.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.decryptUsingJWE = async (req, res) => {
    const { encryptedToken, entityId } = req.body;

    if (!encryptedToken || !entityId) {
        return res.status(400).send({ error: 'Encrypted token and entityId are required' });
    }

    try {
        const jws = await jweService.decryptJWE(encryptedToken, entityId);
        res.status(200).send({ jws });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
