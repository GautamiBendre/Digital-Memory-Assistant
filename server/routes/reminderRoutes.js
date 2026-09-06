import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  sendTestEmail,
  processReminderTest,
} from "../controllers/reminderController.js";

const router = express.Router();

router.post("/test-email", protect, sendTestEmail);
router.post("/process-test", protect, processReminderTest);

export default router;