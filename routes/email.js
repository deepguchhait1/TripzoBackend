import express from "express";
import { sendOtpEmail } from "../services/emailService.js";
const router = express.Router();

// In-memory OTP store: { email: { otp, expiresAt } }
const otpStore = new Map();

// Cleanup expired OTPs every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of otpStore) {
    if (data.expiresAt < now) otpStore.delete(email);
  }
}, 5 * 60 * 1000);

// POST /api/email/send-otp — Send OTP to email
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Rate limit: 60 seconds between sends to same email
    const existing = otpStore.get(email);
    if (existing && existing.expiresAt - 9 * 60 * 1000 > Date.now()) {
      return res.status(429).json({ message: "Please wait before requesting a new code" });
    }

    // Generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Store with 10 min expiry
    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    // Send email
    await sendOtpEmail(email, otp);

    res.json({ message: "Verification code sent to your email" });
  } catch (error) {
    console.error("Send OTP error:", error.message);
    res.status(500).json({ message: "Failed to send verification code. Please try again." });
  }
});

// POST /api/email/verify-otp — Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const stored = otpStore.get(email);
    if (!stored) {
      return res.status(400).json({ message: "No verification code found. Please request a new one." });
    }

    if (stored.expiresAt < Date.now()) {
      otpStore.delete(email);
      return res.status(400).json({ message: "Verification code expired. Please request a new one." });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // OTP valid — remove it
    otpStore.delete(email);

    res.json({ message: "Email verified successfully", verified: true });
  } catch (error) {
    console.error("Verify OTP error:", error.message);
    res.status(500).json({ message: "Verification failed. Please try again." });
  }
});

export default router;
