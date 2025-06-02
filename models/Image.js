const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,         // ✅ Missing type was the problem
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image", ImageSchema);
