const express = require("express");
const { login } = require("../controllers/auth/loginController.js");
const { logout } = require("../controllers/auth/logoutController.js");
const { signup } = require("../controllers/auth/signupController.js");
const adminLogin = require("../controllers/auth/adminLoginController.js");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);
router.post("/admin-login", adminLogin)

module.exports = router;