const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/helper-cloudinary");
const fs = require("fs");

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
    // Only authenticated users can access this route
    const images = await Image.find({}).select("url");

    return res.status(200).json({
      success: true,
      message: "Images fetched successfully!",
      images,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching images! Please try again.",
    });
  }
};

module.exports = { uploadImageController, fetchImagesController };
