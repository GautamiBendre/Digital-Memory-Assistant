import express from "express";
import { GoogleGenAI } from "@google/genai";
import upload from "../middleware/uploadMiddleware.js";
import { extractDocumentInfo } from "../services/geminiService.js";

const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Temporary Gemini connection test
router.get("/test", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello to MemoryVault in one short sentence.",
    });

    res.json({
      success: true,
      message: response.text,
    });
  } catch (error) {
    console.error("Gemini Test Error:", error);

    res.status(500).json({
      success: false,
      message: "Gemini test failed.",
      error: error.message,
    });
  }
});

// Analyze uploaded document
router.post(
  "/analyze",
  upload.single("file"),
  async (req, res) => {
    try {
      // Check file
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a document file.",
        });
      }

      console.log("File received:", req.file.originalname);
      console.log("File type:", req.file.mimetype);

      // Send document to Gemini
      const extractedData = await extractDocumentInfo(
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname
      );

      return res.status(200).json({
        success: true,
        message: "Document analyzed successfully.",
        extractedData,
      });

    } catch (error) {
      console.error("Document Analysis Error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to analyze document.",
        error: error.message,
      });
    }
  }
);

export default router;