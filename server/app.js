import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import careerRoutes from "./routes/careerRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// --- Core middleware ---
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // allow cookies (refresh token) to be sent
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "API is running" });
});

// --- Feature routes ---
app.use("/api/auth", authRoutes);
app.use("/api/careers", careerRoutes);
// As we continue: app.use("/api/courses", courseRoutes);
// app.use("/api/mentors", mentorRoutes);
// app.use("/api/assessments", assessmentRoutes);
// app.use("/api/resume", resumeRoutes);
// app.use("/api/blogs", blogRoutes);
// app.use("/api/contact", contactRoutes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

export default app;
