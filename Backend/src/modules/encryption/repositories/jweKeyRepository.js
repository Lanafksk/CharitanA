const jweKey = require('../models/jweKeyModel');

/**
 * Find an RSA key pair by entity ID.
 * @param {string} entityId - The unique identifier for the entity.
 * @returns {Promise<Object|null>} The key pair if found, otherwise null.
 */
exports.findKeyByEntityId = async (entityId) => {
    return jweKey.findOne({ entity_id: entityId });
}

/**
 * Save a new RSA key pair.
 * @param {Object} keyData - The data to save.
 * @returns {Promise<Object>} The saved key pair.
 */
exports.saveKeyPair = async(entityId, publicKey, privateKey) => {
    const key = new jweKey({
        entity_id: entityId,
        public_key: publicKey,
        private_key: privateKey
    });
    return await key.save();
}