const { Router } = require("express");
const {
  addAddress,
  getAllAddress,
} = require("../controllers/address/addressController");
const router = Router();

router.post("/", addAddress);
router.get("/", getAllAddress);

module.exports = router;
