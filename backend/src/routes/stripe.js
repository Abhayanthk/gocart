const { Router } = require("express");
const {
  verifyStripePayment,
} = require("../controllers/stripe/stripeController");
const router = Router();

router.post("/", verifyStripePayment);

module.exports = router;
