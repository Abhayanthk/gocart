const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { Router } = require("express");
const {
  createStore,
  getStore,
} = require("../controllers/store/createController.js");
const { getDashboard } = require("../controllers/store/dashbroadController.js");
const { isSeller } = require("../controllers/store/is-sellerController.js");
const {
  addProduct,
  getProducts,
} = require("../controllers/store/proudctController.js");
const {
  toggleStock,
} = require("../controllers/store/stock-toggleController.js");
const {
  getOrders,
  updateOrderStatus,
} = require("../controllers/store/ordersController.js");
const { getStoreData } = require("../controllers/store/dataController.js");
const router = Router();

router.post("/create", upload.single("image"), createStore);
router.get("/create", getStore);
router.get("/dashboard", getDashboard);
router.get("/is-seller", isSeller);
router.post("/product", upload.array("images", 10), addProduct);
router.get("/products", getProducts);
router.post("/stock-toggle", toggleStock);
router.get("/orders", getOrders);
router.post("/order-status", updateOrderStatus);
router.get("/data", getStoreData);

module.exports = router;
