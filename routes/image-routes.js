const express = require("express");
const router = express.Router();

// Middlewares to protect the routes
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");

// Third Party Middleware -> Multer is a node.js middleware for handling multipart/form-data, store your image locally
const imageUploadMiddleware = require("../middlewares/image-upload-middleware");

// Use Image Controllers
const {
  uploadImageController,
  fetchImagesController,
} = require("../controllers/image-controller");

// Endpoint to Upload the Image
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  imageUploadMiddleware.single("image"),
  uploadImageController
);

// Endpoint To Get All Uploaded Images
router.get("/fetchImages", authMiddleware, fetchImagesController);

module.exports = router;
