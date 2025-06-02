const cloudinary = require("../config/config-cloudinary.js");

const uploadToCloudinary = async (filePath) => {
  try {
    // Upload an Image

    const uploadResult = await cloudinary.uploader.upload(filePath);

    return {
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };
  } catch (error) {
    console.error("Error occurred while uploading to Cloudinary:", error);
    throw new Error("Error occurred while uploading to Cloudinary.");
  }
};

module.exports = { uploadToCloudinary };
