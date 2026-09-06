import User from "../models/user.js";
import { sendEmail } from "../services/emailService.js";
import { processReminders } from "../services/reminderService.js";

export const sendTestEmail = async (req, res) => {
  try {
    const userId = req.user.id || req.user;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    await sendEmail({
      to: user.email,
      subject: "MemoryVault Email Test",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>MemoryVault 📁</h2>

          <p>Hello ${user.name || "User"},</p>

          <p>
            This is a test email from your MemoryVault application.
          </p>

          <p>
            Your email notification system is working successfully. ✅
          </p>

          <hr />

          <p style="color: #777;">
            MemoryVault — Your documents, always in reach.
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Test email sent successfully.",
    });
  } catch (error) {
    console.error("Test Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send test email.",
    });
  }
};


export const processReminderTest = async (req, res) => {
  try {
    await processReminders();

    return res.status(200).json({
      success: true,
      message: "Reminder processing completed.",
    });
  } catch (error) {
    console.error("Process Reminder Test Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process reminders.",
    });
  }
};