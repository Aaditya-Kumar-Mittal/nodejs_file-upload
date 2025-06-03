const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  changePassword,
} = require("../../controllers/auth-controller");

const authMiddleware = require("../../middlewares/auth-middleware");

// Define all routes related to authetication and authorization

router.post("/register", registerUser);

router.post("/login", loginUser);

// Password change functionality is implemented if the user is autheticated.
// We would need the token object to get key information.
router.post("/changePassword", authMiddleware, changePassword);

module.exports = router;
