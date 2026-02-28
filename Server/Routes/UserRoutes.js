import express from "express";
import {
  getUserByUsername,
  followUser,
} from "../Controllers/user.controller.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
const router = express.Router();

router.get("/:username", AuthMiddleware, getUserByUsername);
router.post("/:userId/follow", AuthMiddleware, followUser);

export default router;
