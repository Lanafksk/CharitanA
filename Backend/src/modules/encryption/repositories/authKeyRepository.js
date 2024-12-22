const AuthKey = require('../models/authKeyModel');

// Get specific entity
exports.findEntity = async (entityId) => {
    return await AuthKey
        .findOne({ entity_id: entityId })
        .lean();
}

// Create new entity and key pair
exports.saveKeys = async ( entityId, publicKey, privateKey ) => {
    const key = new AuthKey({ 
        entity_id: entityId, 
        public_key: publicKey, 
        private_key: privateKey 
    });
    return await key.save();
}

// Get the public key of a specific entity
exports.getPublicKey = async (entityId) => {
    const key = await AuthKey.findOne({ entity_id: entityId });
    if (key) {
        return key.public_key;
    }
    else {
        throw new Error(`No key found for entityId: ${entityId}`);
    }
}

// Get the private key of a specific entity
exports.getPrivateKey = async (entityId) => {
    const key = await AuthKey.findOne({ entity_id: entityId });
    if (key) {
        return key.private_key;
    }
    else {
        throw new Error(`No key found for entityId: ${entityId}`);
    }
}


// Update key pair in database
exports.updateKeys = async (entityId, publicKey, privateKey) => {
    const existingKey = await AuthKey
        .findOne({ entity_id: entityId })
        .select('_id')
        .lean();
    await AuthKey.updateOne({ _id: existingKey._id }, { publicKey, privateKey });
}

// Delete a key pair from the database
exports.deleteKeys = async (entityId) => {
    await AuthKey
        .findOneAndDelete({ entity_id: entityId });
}