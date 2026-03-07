const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");
const {
  sendBookingConfirmation,
  sendBookingStatusUpdate,
  sendAdminNewBookingAlert,
  sendBookingReply,
} = require("../services/emailService");

// POST /api/bookings — Public (submit booking)
router.post("/", async (req, res) => {
  try {
    const data = { ...req.body };

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!data.email || !emailRegex.test(data.email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // Sanitize ObjectId fields: empty strings become null
    if (!data.packageId) data.packageId = null;
    if (!data.destinationId) data.destinationId = null;

    const booking = await Booking.create(data);

    // Send emails (non-blocking: don't fail booking if email fails)
    sendBookingConfirmation(booking).catch((err) =>
      console.warn("Booking confirmation email failed:", err.message)
    );
    sendAdminNewBookingAlert(booking).catch((err) =>
      console.warn("Admin alert email failed:", err.message)
    );

    res.status(201).json({ message: "Booking submitted successfully", booking });
  } catch (error) {
    res.status(400).json({ message: "Validation error", error: error.message });
  }
});

// GET /api/bookings — Admin (list all bookings)
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("packageId", "price originalPrice")
      .populate("destinationId", "price")
      .sort({ createdAt: -1 });

    // Compute totalPrice for bookings that don't have it
    const results = bookings.map((b) => {
      const obj = b.toObject();
      if (!obj.totalPrice || obj.totalPrice === 0) {
        const pkgPrice = obj.packageId?.price || 0;
        const destPrice = obj.destinationId?.price || 0;
        const perPerson = pkgPrice + destPrice;
        const travelers = obj.travelers || 1;
        const subtotal = perPerson * travelers;
        const tax = Math.round(subtotal * 0.05);
        obj.totalPrice = subtotal + tax;
      }
      // Remove populated refs to keep response clean
      if (obj.packageId && typeof obj.packageId === "object") obj.packageId = b.packageId?._id || null;
      if (obj.destinationId && typeof obj.destinationId === "object") obj.destinationId = b.destinationId?._id || null;
      return obj;
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/bookings/:id — Admin (update status)
router.put("/:id", auth, async (req, res) => {
  try {
    const oldBooking = await Booking.findById(req.params.id);
    if (!oldBooking) return res.status(404).json({ message: "Not found" });

    const oldStatus = oldBooking.status;
    const updateData = { ...req.body };
    // Track which admin handled this booking
    if (!oldBooking.handledBy) {
      updateData.handledBy = req.admin._id;
    }
    const booking = await Booking.findByIdAndUpdate(req.params.id, updateData, {
      returnDocument: 'after',
    });

    // Send status update email if status changed
    if (req.body.status && req.body.status !== oldStatus) {
      sendBookingStatusUpdate(booking).catch((err) =>
        console.warn("Status update email failed:", err.message)
      );
    }

    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: "Update error", error: error.message });
  }
});

// DELETE /api/bookings/:id — Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/bookings/:id/email — Admin (send email to customer)
router.post("/:id/email", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const { subject, body } = req.body;
    if (!subject || !body) {
      return res.status(400).json({ message: "Subject and body are required" });
    }

    await sendBookingReply(booking, subject, body);

    // Track which admin handled this booking
    if (!booking.handledBy) {
      booking.handledBy = req.admin._id;
      await booking.save();
    }

    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Booking email error:", error.message);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

module.exports = router;
