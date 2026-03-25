import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
    const user = User.create({
      name,
      username,
      email,
      password: hashedPassword,
      bio
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
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }


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