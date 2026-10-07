import Document from "../models/document.js";
import { askChatbot } from "../services/chatbotService.js";

/*
  Never send the actual document number to Gemini.
*/
const maskDocumentNumber = (documentNumber) => {
  if (!documentNumber) {
    return null;
  }

  return "MASKED";
};

/*
  Calculate document expiry information on the backend.

  Gemini must trust these values and must not calculate
  expiry days itself.
*/
const getExpiryInfo = (expiryDate) => {
  if (!expiryDate) {
    return {
      daysRemaining: null,
      status: "No expiry date",
      priority: 5,
      actionRequired: false,
    };
  }

  const today = new Date();
  const expiry = new Date(expiryDate);

  // Compare dates only, not time.
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const difference =
    (expiry - today) / (1000 * 60 * 60 * 24);

  const daysRemaining = Math.round(difference);

  // Already expired
  if (daysRemaining < 0) {
    return {
      daysRemaining,
      status: "Expired",
      priority: 1,
      actionRequired: true,
    };
  }

  // Expires within 7 days
  if (daysRemaining <= 7) {
    return {
      daysRemaining,
      status: "Critical - expires within 7 days",
      priority: 2,
      actionRequired: true,
    };
  }

  // Expires within 30 days
  if (daysRemaining <= 30) {
    return {
      daysRemaining,
      status: "Expiring Soon - within 30 days",
      priority: 3,
      actionRequired: true,
    };
  }

  // Valid
  return {
    daysRemaining,
    status: "Valid",
    priority: 4,
    actionRequired: false,
  };
};

export const chatWithAssistant = async (req, res) => {
  try {
    const { message } = req.body;

    // Validate message
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    // Logged-in user's ID
    const userId = req.user.id || req.user;

    /*
      Only retrieve the user's active/current documents.

      Archived and previous renewal versions are excluded.
    */
    const documents = await Document.find({
      user: userId,
      status: "active",
      isCurrent: true,
    }).select(
      "documentName category documentNumber issueDate expiryDate description"
    );

    /*
      Create safe document context for Gemini.
    */
    const documentContext = documents
      .map((doc) => {
        const expiryInfo = getExpiryInfo(doc.expiryDate);

        return {
          documentName: doc.documentName,

          category: doc.category,

          // Never expose the actual document number.
          documentNumber: doc.documentNumber
            ? maskDocumentNumber(doc.documentNumber)
            : null,

          issueDate: doc.issueDate || null,

          expiryDate: doc.expiryDate || null,

          /*
            This identifies the source of the stored expiry date.
          */
          expirySource: doc.expiryDate
            ? "MemoryVault"
            : null,

          daysRemaining: expiryInfo.daysRemaining,

          expiryStatus: expiryInfo.status,

          priority: expiryInfo.priority,

          documentActionRequired:
            expiryInfo.actionRequired,

          description: doc.description || null,
        };
      })
      .sort((a, b) => a.priority - b.priority);

    console.log(
      "Chatbot Document Context:",
      documentContext
    );

    /*
      Ask the specialized MemoryVault chatbot.
    */
    const reply = await askChatbot(
      message.trim(),
      documentContext
    );

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Chatbot Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get chatbot response.",
    });
  }
};