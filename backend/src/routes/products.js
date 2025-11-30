const { Router } = require("express");
const { getProducts } = require("../controllers/products/productsController");

const router = Router();

router.get("/", getProducts);

module.exports = router;
