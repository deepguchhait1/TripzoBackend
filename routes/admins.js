import express from "express";
import Admin from "../models/Admin.js";
import Booking from "../models/Booking.js";
import Contact from "../models/Contact.js";
import auth from "../middleware/auth.js";
import superadmin from "../middleware/superadmin.js";
const router = express.Router();

// GET /api/admins — List all admins (any admin can see the team)
router.get("/", auth, async (req, res) => {
  try {
    const admins = await Admin.find()
      .select("-password")
      .sort({ createdAt: 1 });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/admins — Create a new admin (superadmin only)
router.post("/", superadmin, async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check for duplicate email
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "An admin with this email already exists" });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      phone: phone || "",
      role: "admin", // Always create as regular admin, never superadmin
    });

    const created = await Admin.findById(admin._id).select("-password");
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/admins/activity — Admin activity stats (all admins can see)
// MUST come before /:id routes so Express doesn't treat "activity" as an id
router.get("/activity", auth, async (req, res) => {
  try {
    const admins = await Admin.find().select("-password").sort({ createdAt: 1 });

    // Per-admin handled counts
    const adminActivity = await Promise.all(
      admins.map(async (admin) => {
        const [bookingsHandled, contactsHandled] = await Promise.all([
          Booking.countDocuments({ handledBy: admin._id }),
          Contact.countDocuments({ handledBy: admin._id }),
        ]);
        return {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          avatar: admin.avatar,
          bookingsHandled,
          contactsHandled,
          totalHandled: bookingsHandled + contactsHandled,
        };
      })
    );

    // Daily activity for the last 30 days (bookings handled per day per admin)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const bookingTimeline = await Booking.aggregate([
      {
        $match: {
          handledBy: { $ne: null },
          updatedAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
            admin: "$handledBy",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    const contactTimeline = await Contact.aggregate([
      {
        $match: {
          handledBy: { $ne: null },
          updatedAt: { $gte: thirtyDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
            admin: "$handledBy",
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    // Build timeline data grouped by date
    const timelineMap = {};
    const adminMap = {};
    admins.forEach((a) => {
      adminMap[a._id.toString()] = a.name;
    });

    // Fill all 30 days
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      timelineMap[key] = { date: key };
      admins.forEach((a) => {
        timelineMap[key][a.name] = 0;
      });
    }

    bookingTimeline.forEach((item) => {
      const date = item._id.date;
      const adminName = adminMap[item._id.admin.toString()];
      if (timelineMap[date] && adminName) {
        timelineMap[date][adminName] =
          (timelineMap[date][adminName] || 0) + item.count;
      }
    });

    contactTimeline.forEach((item) => {
      const date = item._id.date;
      const adminName = adminMap[item._id.admin.toString()];
      if (timelineMap[date] && adminName) {
        timelineMap[date][adminName] =
          (timelineMap[date][adminName] || 0) + item.count;
      }
    });

    const timeline = Object.values(timelineMap);

    // Handled customers detail (superadmin only sees full detail)
    let handledCustomers = [];
    if (req.admin.role === "superadmin") {
      const [handledBookings, handledContacts] = await Promise.all([
        Booking.find({ handledBy: { $ne: null } })
          .populate("handledBy", "name email avatar")
          .select("name email packageTitle destinationTitle status handledBy createdAt")
          .sort({ updatedAt: -1 })
          .limit(50),
        Contact.find({ handledBy: { $ne: null } })
          .populate("handledBy", "name email avatar")
          .select("name email subject status handledBy createdAt")
          .sort({ updatedAt: -1 })
          .limit(50),
      ]);

      handledCustomers = [
        ...handledBookings.map((b) => ({
          _id: b._id,
          type: "booking",
          customerName: b.name,
          customerEmail: b.email,
          detail: b.packageTitle || b.destinationTitle || "Booking",
          status: b.status,
          handledBy: b.handledBy,
          date: b.createdAt,
        })),
        ...handledContacts.map((c) => ({
          _id: c._id,
          type: "contact",
          customerName: c.name,
          customerEmail: c.email,
          detail: c.subject || "Contact",
          status: c.status,
          handledBy: c.handledBy,
          date: c.createdAt,
        })),
      ].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Status breakdown
    const [confirmedBookings, pendingBookings, cancelledBookings, completedBookings, newContacts, repliedContacts] =
      await Promise.all([
        Booking.countDocuments({ status: "confirmed" }),
        Booking.countDocuments({ status: "pending" }),
        Booking.countDocuments({ status: "cancelled" }),
        Booking.countDocuments({ status: "completed" }),
        Contact.countDocuments({ status: "new" }),
        Contact.countDocuments({ status: "replied" }),
      ]);

    res.json({
      adminActivity,
      timeline,
      adminNames: admins.map((a) => a.name),
      handledCustomers,
      statusBreakdown: {
        bookings: {
          confirmed: confirmedBookings,
          pending: pendingBookings,
          cancelled: cancelledBookings,
          completed: completedBookings,
        },
        contacts: {
          new: newContacts,
          replied: repliedContacts,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/admins/activity/log/:type/:id — Remove a handled customer log entry (superadmin only)
router.delete("/activity/log/:type/:id", superadmin, async (req, res) => {
  try {
    const { type, id } = req.params;
    if (type === "booking") {
      await Booking.findByIdAndUpdate(id, { $unset: { handledBy: "" } });
    } else if (type === "contact") {
      await Contact.findByIdAndUpdate(id, { $unset: { handledBy: "" } });
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }
    res.json({ message: "Log entry removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/admins/activity/logs — Clear all handled customer logs (superadmin only)
router.delete("/activity/logs", superadmin, async (req, res) => {
  try {
    await Promise.all([
      Booking.updateMany({ handledBy: { $ne: null } }, { $unset: { handledBy: "" } }),
      Contact.updateMany({ handledBy: { $ne: null } }, { $unset: { handledBy: "" } }),
    ]);
    res.json({ message: "All log entries cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE /api/admins/:id — Remove an admin (superadmin only, cannot delete self)
router.delete("/:id", superadmin, async (req, res) => {
  try {
    // Cannot delete yourself
    if (req.params.id === req.admin._id.toString()) {
      return res.status(400).json({ message: "You cannot remove yourself" });
    }

    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Cannot delete another superadmin
    if (admin.role === "superadmin") {
      return res.status(403).json({ message: "Cannot remove a Super Admin" });
    }

    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: "Admin removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
