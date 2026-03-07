const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Destination = require("../models/Destination");
const Package = require("../models/Package");
const Testimonial = require("../models/Testimonial");
const Blog = require("../models/Blog");
const Contact = require("../models/Contact");
const Booking = require("../models/Booking");
const Subscriber = require("../models/Subscriber");

// GET /api/stats/public — Public homepage stats
router.get("/public", async (req, res) => {
  try {
    const [destinations, packages, testimonials, bookings] = await Promise.all([
      Destination.countDocuments({ active: true }),
      Package.countDocuments({ active: true }),
      Testimonial.countDocuments({ active: true }),
      Booking.countDocuments(),
    ]);

    // Category-wise destination counts
    const categoryCounts = await Destination.aggregate([
      { $match: { active: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    const categories = {};
    categoryCounts.forEach((c) => {
      categories[c._id] = c.count;
    });

    res.json({
      destinations,
      packages,
      testimonials,
      happyCustomers: bookings,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/stats — Admin dashboard stats
router.get("/", auth, async (req, res) => {
  try {
    const [destinations, packages, testimonials, blogs, contacts, newContacts, bookings, pendingBookings, subscribers, activeSubscribers] =
      await Promise.all([
        Destination.countDocuments(),
        Package.countDocuments(),
        Testimonial.countDocuments(),
        Blog.countDocuments(),
        Contact.countDocuments(),
        Contact.countDocuments({ status: "new" }),
        Booking.countDocuments(),
        Booking.countDocuments({ status: "pending" }),
        Subscriber.countDocuments(),
        Subscriber.countDocuments({ active: true }),
      ]);

    res.json({
      destinations,
      packages,
      testimonials,
      blogs,
      contacts,
      newContacts,
      bookings,
      pendingBookings,
      subscribers,
      activeSubscribers,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
