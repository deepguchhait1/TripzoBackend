const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const auth = require("../middleware/auth");
const {
  sendContactAcknowledgement,
  sendAdminContactAlert,
  sendContactReply,
} = require("../services/emailService");

// POST /api/contacts — Public (submit contact form)
router.post("/", async (req, res) => {
  try {
    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!req.body.email || !emailRegex.test(req.body.email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    const contact = await Contact.create(req.body);

    // Send emails (non-blocking: don't fail contact submission if email fails)
    sendContactAcknowledgement(contact).catch((err) =>
      console.warn("Contact acknowledgement email failed:", err.message)
    );
    sendAdminContactAlert(contact).catch((err) =>
      console.warn("Admin contact alert email failed:", err.message)
    );

    res.status(201).json({ message: "Message sent successfully", contact });
  } catch (error) {
    res.status(400).json({ message: "Validation error", error: error.message });
  }
});

// GET /api/contacts — Admin
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/contacts/:id/reply — Admin (send reply email)
router.post("/:id/reply", auth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    const { subject, body } = req.body;
    if (!subject || !body) {
      return res.status(400).json({ message: "Subject and body are required" });
    }

    await sendContactReply(contact, subject, body);

    // Auto-mark as replied and track handler
    contact.status = "replied";
    if (!contact.handledBy) {
      contact.handledBy = req.admin._id;
    }
    await contact.save();

    res.json({ message: "Reply sent successfully", contact });
  } catch (error) {
    console.error("Reply email error:", error.message);
    res.status(500).json({ message: "Failed to send reply email", error: error.message });
  }
});

// PUT /api/contacts/:id — Admin (update status)
router.put("/:id", auth, async (req, res) => {
  try {
    const updateData = { ...req.body };
    const existing = await Contact.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Not found" });
    // Track handler on first interaction
    if (!existing.handledBy) {
      updateData.handledBy = req.admin._id;
    }
    const contact = await Contact.findByIdAndUpdate(req.params.id, updateData, {
      returnDocument: 'after',
    });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: "Update error", error: error.message });
  }
});

// DELETE /api/contacts/:id — Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
