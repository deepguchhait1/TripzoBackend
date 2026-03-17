dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from "./routes/auth.js";
import adminsRoutes from "./routes/admins.js";
import destinationsRoutes from "./routes/destinations.js";
import packagesRoutes from "./routes/packages.js";
import testimonialsRoutes from "./routes/testimonials.js";
import blogsRoutes from "./routes/blogs.js";
import contactsRoutes from "./routes/contacts.js";
import bookingsRoutes from "./routes/bookings.js";
import statsRoutes from "./routes/stats.js";
import searchRoutes from "./routes/search.js";
import subscribersRoutes from "./routes/subscribers.js";
import uploadRoutes from "./routes/upload.js";

const app = express();


// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
// Fallback CORS header for all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins[0] || "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/destinations", destinationsRoutes);
app.use("/api/packages", packagesRoutes);
app.use("/api/testimonials", testimonialsRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/subscribers", subscribersRoutes);
app.use("/api/upload", uploadRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Connect DB & Start Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
