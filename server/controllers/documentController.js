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
      fileUrl: uploadResult.secure_url,
      filePublicId: uploadResult.public_id,
      fileType: req.file.mimetype,
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