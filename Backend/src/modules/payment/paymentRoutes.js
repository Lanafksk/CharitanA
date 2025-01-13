const express = require("express");
const paymentController = require("./paymentController");
const router = express.Router();

router.post("/", paymentController.initiatePayment);
router.get("/capture", paymentController.capturePayment);
router.post("/webhook/paypal", paymentController.handlePaypalWebhook);

router.get("/", (req, res) => {
    res.send("payment is running");
});

module.exports = router;