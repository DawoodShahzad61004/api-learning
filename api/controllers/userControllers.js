import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password");
    // Exclude password field
    res.status(200).json({
      message: "Users fetched successfully",
      users: users.map((user) => ({
        id: user._id,
        email: user.email,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

export const createUser = async (req, res, next) => {
  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        // Conflict status code
        message: "Email already exists",
      });
    }
    // Hash the user's plain-text password using bcrypt with a salt rounds value of 10
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hashedPassword,
    });
    const result = await user.save();
    res.status(201).json({
      message: "User created successfully",
      createdUser: {
        id: result.id,
        email: result.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        // Unauthorized status code
        message: "Authentication failed",
      });
    }
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
    // Generate JWT token on successful authentication
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    res.status(200).json({
      message: "Authentication successful",
      userId: user._id,
      email: user.email,
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await User.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};
