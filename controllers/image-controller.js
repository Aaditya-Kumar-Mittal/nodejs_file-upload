const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/helper-cloudinary");
const fs = require("fs");
const cloudinary = require("../config/config-cloudinary");

const uploadImageController = async (req, res) => {
  // The request will contain the file data

  try {
    // Check if the file is miising in request object
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is missing and is required. Please upload an image.",
      });
    }

    // Upload the file to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // Store the image url and public id along with other information
    const newImageToUpload = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
      createdAt: Date.now(),
    });

    // Save the image to database
    await newImageToUpload.save();

    /*
    // Delete the file from Local Storage
    fs.unlinkSync(req.file.path);
    */

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully!",
      image: newImageToUpload,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while uploading image! Please try again.",
    });
  }
};

const fetchImagesController = async (req, res) => {
  try {
    // Pagination for Images
    const page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 3;

    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";

    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const totalImages = await Image.countDocuments({});

    const totalPages = Math.ceil(totalImages / limit);

    const sortObject = { [sortBy]: sortOrder };

    // Only authenticated users can access this route
    const images = await Image.find().sort(sortObject).skip(skip).limit(limit);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: totalPages,
      totalImages: totalImages,
      message: "Images fetched successfully!",
      data: images,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching images! Please try again.",
    });
  }
};

// Delete Image controller
const deleteImageConrtroller = async (req, res) => {
  /**
   * Understand which image to delete (imageId) -->
   * Get the userId to check who uploaded the image -->
   * Check if the user deleting the image is the one who uploaded it or not.
   * Delete first from cloudinary and then delete it from database
   */

  try {
    // Get Current Id of Image
    const getIdOfImageToDelete = req.params.id;

    const userId = req.userInfo.userId;

    const image = await Image.findById(getIdOfImageToDelete);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found!",
      });
    }

    // Check if the user who is deleting the image is the one who uploaded it
    if (image.uploadedBy.toString() !== userId) {
      // Some other user is trying to delete the image.

      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image!",
      });
    }

    // Delete the image from cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete the image from database
    await Image.findByIdAndDelete(getIdOfImageToDelete);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error occurred while deleting the image ${error.message}`,
    });
  }
};

module.exports = {
  uploadImageController,
  fetchImagesController,
  deleteImageConrtroller,
};
