import express from "express";
import protect from "../middleware/authMiddleware.js";
import { chatWithAssistant } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/", protect, chatWithAssistant);

export default router;