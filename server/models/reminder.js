import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "30_days",
        "15_days",
        "7_days",
        "3_days",
        "expiry_day",
        "1_day_after",
      ],
      required: true,
    },

    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate reminders for the same document + reminder type
reminderSchema.index(
  {
    document: 1,
    type: 1,
  },
  {
    unique: true,
  }
);

const Reminder =
  mongoose.models.Reminder ||
  mongoose.model("Reminder", reminderSchema);

export default Reminder;