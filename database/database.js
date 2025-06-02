require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error(`Error Occured: ${error}. MongoDB Connection failed!`);
    process.exit(1);
  }
};

module.exports = connectDatabase;
