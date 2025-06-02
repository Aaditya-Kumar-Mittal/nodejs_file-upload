const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../../controllers/auth-controller");

// Define all routes related to authetication and authorization

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;
