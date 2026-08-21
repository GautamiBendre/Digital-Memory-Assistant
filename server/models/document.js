import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    documentName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    documentNumber: {
      type: String,
      trim: true,
    },

    issueDate: {
      type: Date,
    },

    expiryDate: {
      type: Date,
    },

    description: {
      type: String,
      trim: true,
    },

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