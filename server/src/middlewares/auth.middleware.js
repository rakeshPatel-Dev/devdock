// middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticateUser = async (req, res, next) => {
  try {
    // Get token from cookie
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in."
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded);

    // Verify admin still exists and is active
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists."
      });
    }

    // Attach user info to request
    req.user = user;

    next();
  } catch (error) {
    console.error("❌ Auth middleware error:", error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please log in again."
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please log in again."
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed."
    });
  }
};