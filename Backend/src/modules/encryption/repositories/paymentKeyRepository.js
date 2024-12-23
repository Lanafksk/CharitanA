const PaymentKey = require('../models/paymentKeyModel');

// Get specific entity
exports.findEntity = async (entityId) => {
    return await PaymentKey
        .findOne({ entity_id: entityId })
        .lean();
}

// Create new entity and key pair
exports.saveKeys = async ( entityId, publicKey, privateKey) => {
    const key = new PaymentKey({
        entity_id: entityId,
        public_key: publicKey,
        private_key: privateKey
    });
    return await key.save();
}


// Get the public key of a specific entity
exports.getPublicKey = async (entityId) => {
    const key = await PaymentKey.findOne({ entity_id: entityId });
    if (key) {
        return key.public_key;
    }
    else {
        throw new Error(`No key found for entityId: ${entityId}`);
    }
}

// Get the private key of a specific entity
exports.getPrivateKey = async (entityId) => {
    const key = await PaymentKey.findOne({ entity_id: entityId });
    if (key) {
        return key.private_key;
    }
    else {
        throw new Error(`No key found for entityId: ${entityId}`);
    }
}

// Update key pair in database
exports.updateKeys = async (entityId, publicKey, privateKey) => {
    const existingKey = await PaymentKey
        .findOne({ entity_id : entityId })
        .select('_id')
        .lean();
    if (existingKey) {
        await PaymentKey.updateOne({ _id: existingKey._id }, { publicKey, privateKey });
    } else {
        await PaymentKey.create(entityId, publicKey, privateKey );
    }
}

// Delete a key pair from the database
exports.deleteKeys = async (entityId) => {
    await PaymentKey
        .findOneAndDelete({ entity_id: entityId });
}