const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

// We need to protect this router, if the user is not authenticated using middleware.

router.get("/welcome", authMiddleware, (req, res) => {
  const { userId, username, role } = req.userInfo;

  res.json({
    message: "Welcome to the home page",
    userInfo: {
      userId,
      username,
      role,
    },
  });
});

module.exports = router;
