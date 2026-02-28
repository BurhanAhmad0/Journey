import express from "express";
import AuthMiddleware from "../Middlewares/AuthMiddleware.js";
import { upload } from "../Middlewares/MulterMiddleware.js";
import {
  uploadProfilePicture,
  updateProfileInfo,
} from "../Controllers/profile.controller.js";

const router = express.Router();

router.post(
  "/upload",
  AuthMiddleware,
  upload.single("image"),
  uploadProfilePicture,
);
router.post("/update", AuthMiddleware, updateProfileInfo);

export default router;
