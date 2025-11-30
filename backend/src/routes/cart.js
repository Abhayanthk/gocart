const { Router } = require("express");
const {
  updateCart,
  getUserCart,
} = require("../controllers/cart/cartController");
const router = Router();

router.post("/", updateCart);
router.get("/", getUserCart);

module.exports = router;
