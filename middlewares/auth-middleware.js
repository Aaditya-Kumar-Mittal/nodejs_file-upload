const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Auth middleware is running...");

  // Get the auth header

  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  // Check if the token is present
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. No token provided. Kindly login first.",
    });
  }

  // Decode this token
  try {
    const extractToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(extractToken);
    req.userInfo = extractToken;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid token. Kindly login first.",
    });
  }
};

module.exports = authMiddleware;
