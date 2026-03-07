import express from "express";
import Subscriber from "../models/Subscriber.js";
import auth from "../middleware/auth.js";
import { sendSubscriptionConfirmation, sendNewsletterEmail } from "../services/emailService.js";
const router = express.Router();

// POST /api/subscribers — Public (subscribe)
router.post("/", async (req, res) => {
  try {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const email = (req.body.email || "").trim().toLowerCase();

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (existing.active) {
        return res.json({ message: "Successfully subscribed to our newsletter!" });
      }
      // Reactivate
      existing.active = true;
      await existing.save();

      sendSubscriptionConfirmation(email).catch((err) =>
        console.warn("Subscription confirmation email failed:", err.message)
      );

      return res.json({ message: "Welcome back! You've been re-subscribed" });
    }

    await Subscriber.create({ email });

    sendSubscriptionConfirmation(email).catch((err) =>
      console.warn("Subscription confirmation email failed:", err.message)
    );

    res.status(201).json({ message: "Successfully subscribed to our newsletter!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/subscribers — Admin
router.get("/", auth, async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/subscribers/:id — Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const sub = await Subscriber.findByIdAndDelete(req.params.id);
    if (!sub) return res.status(404).json({ message: "Subscriber not found" });
    res.json({ message: "Subscriber removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/subscribers/:id/toggle — Admin (activate/deactivate)
router.put("/:id/toggle", auth, async (req, res) => {
  try {
    const sub = await Subscriber.findById(req.params.id);
    if (!sub) return res.status(404).json({ message: "Subscriber not found" });
    sub.active = !sub.active;
    await sub.save();
    res.json(sub);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/subscribers/send-email — Admin (send newsletter to subscribers)
router.post("/send-email", auth, async (req, res) => {
  try {
    const { subject, body, recipients } = req.body;

    if (!subject || !body) {
      return res.status(400).json({ message: "Subject and body are required" });
    }

    // recipients: "all" (default), "active", or array of email strings
    let emails = [];
    if (Array.isArray(recipients) && recipients.length > 0) {
      emails = recipients;
    } else {
      const filter = recipients === "active" || !recipients ? { active: true } : {};
      const subs = await Subscriber.find(filter).select("email");
      emails = subs.map((s) => s.email);
    }

    if (emails.length === 0) {
      return res.status(400).json({ message: "No subscribers to send to" });
    }

    let sent = 0;
    let failed = 0;
    for (const email of emails) {
      try {
        await sendNewsletterEmail(email, subject, body);
        sent++;
      } catch {
        failed++;
      }
    }

    res.json({
      message: `Email sent to ${sent} subscriber${sent !== 1 ? "s" : ""}${failed ? `, ${failed} failed` : ""}`,
      sent,
      failed,
      total: emails.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
