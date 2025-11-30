const { Router } = require("express");
const {
  createOrder,
  getAllOrders,
} = require("../controllers/orders/ordersController");
const router = Router();
router.post("/create", createOrder);
router.get("/", getAllOrders);
module.exports = router;
