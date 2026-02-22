import crypto from "crypto";
import bcrypt from "bcrypt";
import UserModel from "../Models/UserModel.js";
import { transporter } from "../Utils/Nodemailer.js";

import { asyncHandler } from "../Middlewares/AsyncHandler.js";
import { generateToken } from "../Utils/GenerateToken.js";
import { sendResponse } from "../Utils/Response.js";
import {
  loginUser,
  registerUser,
  forgotPasswordService,
  resetPasswordService,
} from "../Services/auth.service.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, 400, false, "All fields are required");
  }

  const user = await loginUser(email, password);

  generateToken(res, user._id);

  sendResponse(res, 200, true, "User logged in successfully", {
    user,
  });
});

export const register = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return sendResponse(res, 400, false, "All fields are required");
  }

  // Call service to create user
  const newUser = await registerUser(first_name, last_name, email, password);

  // Generate JWT cookie
  generateToken(res, newUser._id);

  // Send clean response
  sendResponse(res, 201, true, "User registered successfully", {
    user: {
      _id: newUser._id,
      username: newUser.username,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  sendResponse(res, 200, true, "User logged out successfully");
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user.userId; // set by AuthMiddleware

  const user = await UserModel.findById(userId).select("-password");

  if (!user) {
    return sendResponse(res, 404, false, "User not found");
  }

  sendResponse(res, 200, true, "User fetched successfully", { user });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return sendResponse(res, 400, false, "Email is required");
  }

  const result = await forgotPasswordService(email);

  sendResponse(res, 200, true, result.message);
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  if (!password) {
    return sendResponse(res, 400, false, "Password is required");
  }

  await resetPasswordService(token, password);

  sendResponse(res, 200, true, "Password reset successful");
});
