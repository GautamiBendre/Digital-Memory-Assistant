import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    // Logged-in user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // User-selected category
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // AI-extracted document type/name
    documentName: {
      type: String,
      required: true,
      trim: true,
    },

    // AI-extracted document number
    documentNumber: {
      type: String,
      trim: true,
    },

    // AI-extracted dates
    issueDate: {
      type: Date,
    },

    expiryDate: {
      type: Date,
    },

    // AI-generated/extracted description
    description: {
      type: String,
      trim: true,
    },

    // Store additional information extracted by AI
    extractedData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // Cloudinary file information
    fileUrl: {
      type: String,
      required: true,
    },

    filePublicId: {
      type: String,
    },

    fileType: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;


