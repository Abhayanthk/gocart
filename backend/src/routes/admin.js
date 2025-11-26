const { Router } = require("express");
// import { approve, getPendingStores } from "@/backend/controllers/admin/approveController.js";
// import { getDashboardData } from "@/backend/controllers/admin/dashboardController.js";
// import { isAdmin } from "@/backend/controllers/admin/is-adminController.js";

const { toggleStore } = require("../controllers/admin/toggle-storeController");
const { getApprovedStores } = require("../controllers/admin/storeController");
const { isAdmin } = require("../controllers/admin/is-adminController");

const { approve, getPendingStores } = require("../controllers/admin/approveController");
const { getDashboardData } = require("../controllers/admin/dashboardController");


const router = Router();

router.post("/approve", approve);
router.get("/approve-stores", getPendingStores);
router.get("/dashboard", getDashboardData);
router.get("/is-admin", isAdmin);
router.get("/approved-stores", getApprovedStores);
router.post("/toggle-store", toggleStore);

module.exports = router;


