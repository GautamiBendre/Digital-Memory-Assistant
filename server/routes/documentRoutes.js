import express from "express";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createDocument,
  getDocuments,
  renewDocument,
  deleteDocument,
  getDocumentHistory,
} from "../controllers/documentController.js";

const router = express.Router();

// Create document
router.post(
  "/",
  protect,
  upload.single("file"),
  createDocument
);
// Get all documents of logged-in user
router.get(
  "/",
  protect,
  getDocuments
);

router.post(
  "/renew",
  protect,
  upload.single("file"),
  renewDocument
);

router.delete(
  "/:id",
  protect,
  deleteDocument
);

router.get(
  "/:id/history",
  protect,
  getDocumentHistory
);

export default router;