const { Router } = require("express");
const { verifyCoupon } = require("../controllers/coupon/couponController");
const router = Router();

router.post("/verify", verifyCoupon);

module.exports = router;
