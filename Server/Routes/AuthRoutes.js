import express from "express";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import {
  login,
  register,
  logout,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/me", AuthMiddleware, getCurrentUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
