const { Router } = require("express");
const { toggleStore } = require("../controllers/admin/toggle-storeController");
const { getApprovedStores } = require("../controllers/admin/storeController");
const { isAdmin } = require("../controllers/admin/is-adminController");

const {
  approve,
  getPendingStores,
} = require("../controllers/admin/approveController");
const {
  getDashboardData,
} = require("../controllers/admin/dashboardController");
const {
  addCoupon,
  deleteCoupon,
  getCoupons,
} = require("../controllers/admin/couponController");

const router = Router();

router.post("/approve", approve);
router.get("/approve-stores", getPendingStores);
router.get("/dashboard", getDashboardData);
router.get("/approved-stores", getApprovedStores);
router.post("/toggle-store", toggleStore);
router.post("/coupon", addCoupon);
router.delete("/coupon/:code", deleteCoupon);
router.get("/coupons", getCoupons);
router.get("/is-admin", isAdmin);

module.exports = router;
