const express = require("express");
const paymentTestController = require("./paymentTestController");
const router = express.Router();

// Route to create a test payment
router.post("/", paymentTestController.createTestPayment);
// Route to get all payments
router.get("/", paymentTestController.getAllPayments);

router.get('/hello', (req, res) => {
    res.send('payment is running');
});

module.exports = router;