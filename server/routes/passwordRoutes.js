import express from "express";
import protect from "../middleware/authMiddleware.js";
import { changePassword } from "../controllers/passwordController.js";

const router = express.Router();

// Change Password
router.patch("/", protect, changePassword);

export default router;