const express = require('express');
const jweController = require('../controllers/jweController');

const router = express.Router();

// Define routes and map them to controller methods
router.post('/encrypt', jweController.encryptUsingJWE);

router.get('/decrypt', jweController.decryptUsingJWE);

module.exports = router;
