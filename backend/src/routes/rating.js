const { Router } = require("express");
const {
  addRating,
  getAllRating,
} = require("../controllers/rating/ratingController");
const router = Router();

router.post("/", addRating);
router.get("/", getAllRating);

module.exports = router;
