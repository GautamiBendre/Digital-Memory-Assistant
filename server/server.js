import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import passwordRoutes from "./routes/passwordRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import { startReminderCron } from "./services/reminderCron.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";


// Load environment variables
dotenv.config();

console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);

// Connect MongoDB
connectDB();

startReminderCron();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Digital Memory Assistant Backend is Running 🚀");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});