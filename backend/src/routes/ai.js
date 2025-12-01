const { Router } = require("express");
const {
  createProductDescription,
} = require("../controllers/store/aiController");
const route = Router();

route.post("/createProductDescription", createProductDescription);

module.exports = route;
