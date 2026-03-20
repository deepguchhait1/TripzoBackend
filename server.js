import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Initialize dotenv once
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Route Imports
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

// 1. Define Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://tripzo-frontend.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

console.log("Allowed CORS origins:", allowedOrigins);

// 2. Configure CORS Middleware (This replaces your manual header block)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    credentials: true,
  })
);

// 3. Standard Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 4. API Routes
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

// Test & Health Routes
app.get("/api/test", (req, res) => {
  res.json({ test: 'Routes working!', timestamp: new Date() });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  console.log('404 hit for:', req.method, req.originalUrl);
  res.status(404).json({ message: "Route not found" });
});

// 5. Connect DB & Start Server
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