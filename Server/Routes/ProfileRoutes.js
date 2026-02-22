import express from "express";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import { upload } from "../Middlewares/MulterMiddleware.js";
import { uploadProfilePicture } from "../Controllers/profile.controller.js";

const router = express.Router();

router.post(
  "/upload",
  AuthMiddleware,
  upload.single("image"),
  uploadProfilePicture,
);

export default router;
