import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { transporter } from "../Utils/Nodemailer.js";

export const loginUser = async (email, password) => {
  const user = await UserModel.findOne({ email }).select(
    "-avatar_public_id -resetPasswordToken -resetPasswordExpire",
  );

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  // Return user **without password**
  const { password: _, ...filteredUser } = user.toObject();
  return filteredUser;
};

export const registerUser = async (firstName, lastName, email, password) => {
  // Check if email already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.status = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Generate unique username
  let baseUsername = `${firstName}${lastName}`
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9]/g, "");

  let username = baseUsername;
  let counter = 1;
  while (await UserModel.findOne({ username })) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  // Create new user
  const newUser = await UserModel.create({
    username,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  // Return user **without password**
  const { password: _, ...filteredUser } = newUser.toObject();
  return filteredUser;
};

export const forgotPasswordService = async (email) => {
  // 1️⃣ Find user
  const user = await UserModel.findOne({ email });
  if (!user) {
    const error = new Error("User does not exist");
    error.status = 404;
    throw error;
  }

  // 2️⃣ Generate token
  const token = crypto.randomBytes(32).toString("hex");

  // Hash and save token
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
  await user.save();

  // 3️⃣ Construct reset URL
  const resetUrl = `${process.env.FRONTEND_URI}/reset-password/${token}`;

  // 4️⃣ Send email
  await transporter.sendMail({
    from: '"Journey " <burhan.vu57@gmail.com>',
    to: user.email,
    subject: "Password Reset Link",
    html: `<p>Click here to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
  });

  return { message: "Reset link sent to email" };
};

export const resetPasswordService = async (token, newPassword) => {
  // Hash the token from URL
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // Find user with valid token and unexpired
  const user = await UserModel.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    const error = new Error("Invalid or expired token");
    error.status = 400;
    throw error;
  }

  // Hash new password
  // const hashedPassword = await bcrypt.hash(newPassword, 10);
  // user.password = hashedPassword;

  // Remove reset token fields
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return { message: "Password reset successful" };
};
