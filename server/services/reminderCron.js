import cron from "node-cron";
import { processReminders } from "./reminderService.js";

export const startReminderCron = () => {
  // Runs every day at 9:00 AM
  cron.schedule("* * * * *", async () => {
    console.log("⏰ Running daily reminder check...");

    await processReminders();
  });

  console.log("✅ Reminder Cron Job Started");
};