const express = require("express");
const paymentController = require("./paymentController");
const router = express.Router();

router.post("/", paymentController.initiatePayment);
router.get("/capture", paymentController.capturePayment);

module.exports = router;