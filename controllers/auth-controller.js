// register controller, login controller
require("dotenv").config();
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register Controller

const registerUser = async (req, res) => {
  try {
    // Extract the user details from the request
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists. Please login or use different credentials.",
      });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Save the new user
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Registration Error: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login Controller

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Check if the user exists
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "User not registered. Please register first.",
      });
    }

    // Step 2: Compare the entered password with the stored hash
    const checkPassword = await bcryptjs.compare(password, findUser.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Kindly enter the correct credentials.",
      });
    }

    // Step 3: Generate JWT Token *only after password check passes*
    const accessToken = jwt.sign(
      {
        userId: findUser._id,
        username: findUser.username,
        role: findUser.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );

    // Step 4: Send success response
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: findUser.username,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
