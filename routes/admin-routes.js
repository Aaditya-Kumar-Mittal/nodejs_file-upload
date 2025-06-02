const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  const { userId, username, role } = req.userInfo;

  res.json({
    message: "Welcome to the admin page",
    userInfo: { userId, username, role },
  });
});

module.exports = router;
