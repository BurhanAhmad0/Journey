import express from "express";
import { getUserByUsername } from "../Controllers/user.controller.js";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
const router = express.Router();

router.get("/:username", AuthMiddleware, getUserByUsername);

export default router;
