const express = require("express");
const paymentController = require("./paymentController");
const router = express.Router();

router.post("/", paymentController.initiatePayment);
router.get("/capture", paymentController.capturePayment);
router.get('/', (req, res) => {
    res.send('payment is running');
});
router.post("/webhook/paypal", paymentController.handlePaypalWebhook); // Add webhook route

module.exports = router;