import Document from "../models/document.js";
import Reminder from "../models/reminder.js";
import User from "../models/user.js";
import { sendEmail } from "./emailService.js";

const reminderTypes = {
  30: "30_days",
  15: "15_days",
  7: "7_days",
  3: "3_days",
  0: "expiry_day",
  "-1": "1_day_after",
};

export const processReminders = async () => {
  try {
    // Only process the latest active version of each document
    const documents = await Document.find({
      expiryDate: { $ne: null },
      status: "active",
      isCurrent: true,
    });

    for (const document of documents) {
      const user = await User.findById(document.user);

      if (!user || !user.email) {
        continue;
      }

      const today = new Date();
      const expiryDate = new Date(document.expiryDate);

      today.setHours(0, 0, 0, 0);
      expiryDate.setHours(0, 0, 0, 0);

      const difference =
        (expiryDate - today) / (1000 * 60 * 60 * 24);

      const daysLeft = Math.round(difference);

      const reminderType = reminderTypes[daysLeft];

      // No reminder required for this day
      if (!reminderType) {
        continue;
      }

      // Check whether this reminder was already sent
      const alreadySent = await Reminder.findOne({
        document: document._id,
        type: reminderType,
      });

      if (alreadySent) {
        console.log(
          `Reminder already sent: ${document.documentName} - ${reminderType}`
        );
        continue;
      }

      let subject = "";
      let message = "";

      // =====================================================
      // 30 DAYS BEFORE EXPIRY
      // =====================================================

      if (daysLeft === 30) {
        subject = `Your ${document.documentName} expires in 30 days`;

        message =
          "Your document will expire in 30 days. Please plan for the renewal process in advance.";
      }

      // =====================================================
      // 15 DAYS BEFORE EXPIRY
      // =====================================================

      else if (daysLeft === 15) {
        subject = `Your ${document.documentName} expires in 15 days`;

        message =
          "Your document will expire in 15 days. Please start the renewal process.";
      }

      // =====================================================
      // 7 DAYS BEFORE EXPIRY
      // =====================================================

      else if (daysLeft === 7) {
        subject = `Your ${document.documentName} expires in 7 days`;

        message =
          "Your document will expire in 7 days. Please begin the renewal process soon to avoid last-minute issues.";
      }

      // =====================================================
      // 3 DAYS BEFORE EXPIRY
      // =====================================================

      else if (daysLeft === 3) {
        subject = `Your ${document.documentName} expires in 3 days`;

        message =
          "Your document will expire in 3 days. Please renew it soon.";
      }

      // =====================================================
      // EXPIRY DAY
      // =====================================================

      else if (daysLeft === 0) {
        subject = `Your ${document.documentName} expires today`;

        message =
          "Your document expires today. Please renew it as soon as possible if required.";
      }

      // =====================================================
      // 1 DAY AFTER EXPIRY
      // =====================================================

      else if (daysLeft === -1) {
        subject = `Your ${document.documentName} expired yesterday`;

        message =
          "Your document expired yesterday. Please renew it immediately if required.";
      }

      // =====================================================
      // SEND EMAIL
      // =====================================================

      await sendEmail({
        to: user.email,
        subject,

        html: `
          <div
            style="
              font-family: Arial, sans-serif;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              color: #333;
            "
          >

            <h2 style="color: #7c3aed;">
              MemoryVault 📁
            </h2>

            <p>
              Hello ${user.name || "User"},
            </p>

            <p>
              ${message}
            </p>

            <p>
              <strong>Document:</strong>
              ${document.documentName}
            </p>

            <p>
              <strong>Expiry Date:</strong>
              ${expiryDate.toLocaleDateString("en-IN")}
            </p>

            <hr
              style="
                border: none;
                border-top: 1px solid #ddd;
                margin: 20px 0;
              "
            />

            <p
              style="
                color: #777;
                font-size: 13px;
              "
            >
              MemoryVault — Your documents, always in reach.
            </p>

          </div>
        `,
      });

      // =====================================================
      // SAVE REMINDER RECORD
      // Prevent duplicate emails
      // =====================================================

      await Reminder.create({
        user: user._id,
        document: document._id,
        type: reminderType,
      });

      console.log(
        `Reminder sent: ${document.documentName} - ${reminderType}`
      );
    }

    console.log("Reminder processing completed.");
  } catch (error) {
    console.error("Reminder Service Error:", error);
  }
};