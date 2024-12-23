const AuthKey = require('../models/authKeyModel');

/**
 * Fetch an entity from the database.
 * @param {String} entityId 
 * @returns {Object} - The entity object
 */
exports.findEntity = async (entityId) => {
    return await AuthKey
        .findOne({ entity_id: entityId })
        .lean();
}

/**
 * Save a new key pair to the database.
 * @param {String} entityId 
 * @param {String} publicKey 
 * @param {String} privateKey 
 * @returns {Object} - The saved key pair object
 */
exports.saveKeys = async ( entityId, publicKey, privateKey ) => {
    const key = new AuthKey({ 
        entity_id: entityId, 
        public_key: publicKey, 
        private_key: privateKey 
    });
    return await key.save();
}

/**
 * Generate a new key pair for a specific entity.
 * @param {String} entityId 
 */
exports.getPublicKey = async (entityId) => {
    const key = await AuthKey.findOne({ entity_id: entityId });
    if (key) {
        return key.public_key;
    }
    else {
        throw new Error(`No key found for entityId: ${entityId}`);
    }
}

/**
 * Fetch the private key for a specific entity.
 * @param {String} entityId 
 * @returns {String} - The private key
 */
exports.getPrivateKey = async (entityId) => {
    const key = await AuthKey.findOne({ entity_id: entityId });
    if (key) {
        return key.private_key;
    }
    else {
        throw new Error(`No key found for entityId: ${entityId}`);
    }
}

/**
 * Update the key pair for a specific entity.
 * @param {String} entityId 
 * @param {String} publicKey 
 * @param {String} privateKey 
 */
exports.updateKeys = async (entityId, publicKey, privateKey) => {
    await AuthKey.findOneAndUpdate({ entity_id: entityId }, {
        public_key: publicKey,
        private_key: privateKey
    }, { new: true });
}

/**
 * Delete the key pair for a specific entity.
 * @param {String} entityId 
 */
exports.deleteKeys = async (entityId) => {
    await AuthKey
        .findOneAndDelete({ entity_id: entityId });
}