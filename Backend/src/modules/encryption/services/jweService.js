const crypto = require('crypto');
const jose = require('node-jose');
const jweKeyRepository = require('../repositories/jweKeyRepository');

/**
 * Encrypt a JWS token using a JWE token for the given entity ID.
 * @param {string} jws - The JWS token to encrypt.
 * @param {string} entityId - The unique identifier for the entity.
 * @returns {Promise<string>} The encrypted JWE token.
 */
exports.encryptJWE = async (jws, entityId) => {
    try {
        // Check if keys already exist
        let keyPair = await jweKeyRepository.findKeyByEntityId(entityId);
        if (!keyPair) {
            // Generate a new RSA key pair if keys don't exist
            const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
                modulusLength: 2048,
                publicKeyEncoding: { type: 'spki', format: 'pem' },
                privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
            });

            // Save the new key pair to the repository
            keyPair = await jweKeyRepository.saveKeyPair(entityId, publicKey, privateKey);
        }

        // Convert public key PEM to JWK format
        const publicKeyJWK = await jose.JWK.asKey(keyPair.public_key, 'pem');

        // Encrypt the JWS payload
        const jwe = await new jose.JWE.createEncrypt({ format: 'compact' }, publicKeyJWK)
            .update(jws)
            .final();

        return jwe;
    } catch (error) {
        throw new Error(`Encryption failed: ${error.message}`);
    }
}


/**
 * Decrypt a JWE token for the given entity ID.
 * @param {string} jwe - The JWE token to decrypt.
 * @param {string} entityId - The unique identifier for the entity.
 * @returns {Promise<string>} The decrypted JWS token.
 */
exports.decryptJWE = async (jwe, entityId) => {
    try {
        // Retrieve the RSA key pair from the repository
        const keyPair = await jweKeyRepository.findKeyByEntityId(entityId);
        if (!keyPair) throw new Error('Key pair not found for entity_id');

        // Convert private key PEM to JWK format
        const privateKeyJWK = await jose.JWK.asKey(keyPair.private_key, 'pem');

        // Create a keystore and add the private key
        const keystore = jose.JWK.createKeyStore();
        keystore.add(privateKeyJWK);

        // Decrypt the token using the keystore
        const { payload } = await jose.JWE.createDecrypt(keystore).decrypt(jwe);

        return payload.toString('utf8');
    } catch (error) {
        throw new Error(`Decryption failed: ${error.message}`);
    }
}
