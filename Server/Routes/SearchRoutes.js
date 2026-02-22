import express from "express";
import { searchUsers } from "../Controllers/search.controller.js";

const router = express.Router();

router.get("/", searchUsers);

export default router;
