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

// 1. Setup Allowed Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://tripzo-frontend.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

// 2. Apply CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps)
    if (!origin) return callback(null, true);
    
    // Check if origin is in our list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));

// 3. Manual Preflight handling (Add this just in case)
app.options('*', cors()); 

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

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));