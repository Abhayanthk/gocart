const { Router } = require("express");
const { me } = require("../controllers/me/meController.js");

const router = Router();

router.get("/", me);

module.exports = router;