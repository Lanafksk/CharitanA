const express = require('express');
const router = express.Router();
const keyController = require('../controllers/keyController');

// Create a new key pair
router.post('/model/:model/entity/:entityId', keyController.generateKeyPair);

// Get all public key for a specific entity
router.get('/model/:model/entity/:entityId', keyController.fetchPublicKey);

// Get private key for a specific entity
router.get('/model/:model/entity/:entityId/private', keyController.fetchPrivateKey);

// Update key pair for a specific entity
router.put('/model/:model/entity/:entityId', keyController.updateKeyPair);

// Delete key pair for a specific entity
router.delete('/model/:model/entity/:entityId', keyController.deleteKeyPair);

router.post('/encrypt/model/:model/entity/:entityId', keyController.encryptData);

router.get('/decrypt/model/:model/entity/:entityId', keyController.decryptData);

module.exports = router;