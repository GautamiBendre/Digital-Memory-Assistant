import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { createDocument } from "../controllers/documentController.js";

const router = express.Router();

// Create document
router.post(
  "/",
  protect,
  upload.single("file"),
  createDocument
);

export default router;