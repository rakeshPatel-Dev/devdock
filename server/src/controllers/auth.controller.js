import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register user
export const registerUser = async (req, res) => {

  try {
    const { name, username, email, password, bio } = req.body;

    // Check if all fields are provided
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      bio
    });

    // generate cookie
    const token = jwt.sign({
      id: user._id,
    }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error registering user" || error.message,
    })
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body; // Use 'identifier' instead of separate email/username

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Search for user by email OR username
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier }
      ]
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generate cookie
    const token = jwt.sign({
      id: user._id,
    }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });

    // remove password from user
    const userWithoutPassword = await User.findOne({ email }).select("-password");

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error logging in user" || error.message,
    });
  }
};

// Logout user
export const logoutUser = async (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });

}

// Get current user
export const getCurrentUser = async (req, res) => {
  try {

    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findById(userId).select("-password");
    res.status(200).json({
      success: true,
      message: "User found successfully",
      user
    });

  } catch (error) {
    console.log("Error getting current user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get current user"
    });
  }
};