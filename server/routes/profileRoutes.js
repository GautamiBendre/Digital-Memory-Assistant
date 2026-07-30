import express from "express";
import { updateProfile } from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Update Profile
router.patch("/", authMiddleware, updateProfile);

export default router;