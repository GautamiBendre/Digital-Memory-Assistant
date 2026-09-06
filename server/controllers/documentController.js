import Document from "../models/document.js";
import cloudinary from "../config/cloudinary.js";

// Create Document
export const createDocument = async (req, res) => {
  try {
    const userId = req.user.id || req.user;

    const {
      documentName,
      category,
      documentNumber,
      issueDate,
      expiryDate,
      description,
      extractedData,
    } = req.body;

    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document file.",
      });
    }

    // Validate required fields
    if (!documentName || !category) {
      return res.status(400).json({
        success: false,
        message: "Document name and category are required.",
      });
    }

    // Upload file to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "MemoryVault/Documents",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    // Save document in MongoDB
    const document = await Document.create({
      user: userId,
      documentName,
      category,
      documentNumber,
      issueDate: issueDate || null,
      expiryDate: expiryDate || null,
      description,
      extractedData: extractedData || {},

      fileUrl: uploadResult.secure_url,
      filePublicId: uploadResult.public_id,
      fileType: req.file.mimetype,

      status: "active",
      isCurrent: true,
      previousDocument: null,
    });

    return res.status(201).json({
      success: true,
      message: "Document uploaded successfully.",
      document,
    });
  } catch (error) {
    console.error("Create Document Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload document.",
    });
  }
};

// Get all documents of logged-in user
export const getDocuments = async (req, res) => {
  try {
    const userId = req.user.id || req.user;

    const documents = await Document.find({
      user: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      documents,
    });
  } catch (error) {
    console.error("Get Documents Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch documents.",
    });
  }
};

// Renew Document
export const renewDocument = async (req, res) => {
  try {
    const userId = req.user.id || req.user;

    const {
      previousDocumentId,
      documentName,
      category,
      documentNumber,
      issueDate,
      expiryDate,
      description,
      extractedData,
    } = req.body;

    console.log("Renewal Data:", {
      userId,
      previousDocumentId,
    });

    // Validate previous document ID
    if (!previousDocumentId) {
      return res.status(400).json({
        success: false,
        message: "Previous document ID is required.",
      });
    }

    // Find old document by ID
    const oldDocument = await Document.findById(previousDocumentId);

    console.log("OLD DOCUMENT:", oldDocument);

    // Check if document exists
    if (!oldDocument) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    // Make sure the document belongs to logged-in user
    if (oldDocument.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to renew this document.",
      });
    }

    // Make sure it is the current version
    if (oldDocument.isCurrent !== true) {
      return res.status(400).json({
        success: false,
        message: "This document is already archived.",
      });
    }

    // Check new file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload the renewed document file.",
      });
    }

    // Validate required fields
    if (!documentName || !category) {
      return res.status(400).json({
        success: false,
        message: "Document name and category are required.",
      });
    }

    // Upload renewed file to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "MemoryVault/Documents",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(req.file.buffer);
    });

    // Archive old document
    oldDocument.status = "archived";
    oldDocument.isCurrent = false;

    await oldDocument.save();

    // Create new document
    const newDocument = await Document.create({
      user: userId,
      category,
      documentName,
      documentNumber,
      issueDate: issueDate || null,
      expiryDate: expiryDate || null,
      description,
      extractedData: extractedData || {},

      fileUrl: uploadResult.secure_url,
      filePublicId: uploadResult.public_id,
      fileType: req.file.mimetype,

      status: "active",
      isCurrent: true,
      previousDocument: oldDocument._id,
    });

    return res.status(201).json({
      success: true,
      message: "Document renewed successfully.",
      document: newDocument,
    });
  } catch (error) {
    console.error("Renew Document Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to renew document.",
    });
  }
};