const express = require("express");
const router = express.Router();
const Package = require("../models/Package");
const Subscriber = require("../models/Subscriber");
const auth = require("../middleware/auth");
const { sendNewPackageNotification } = require("../services/emailService");

// GET /api/packages — Public
router.get("/", async (req, res) => {
  try {
    const { category, search, limit, sort, minPrice, maxPrice, minRating, duration } = req.query;
    const filter = { active: true };

    if (category && category !== "all") filter.category = category;

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { destinations: { $elemMatch: { $regex: search, $options: "i" } } },
        { highlights: { $elemMatch: { $regex: search, $options: "i" } } },
      ];
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    if (duration && duration !== "all") {
      filter.duration = { $regex: duration, $options: "i" };
    }

    let query = Package.find(filter);

    if (sort === "price-low") query = query.sort({ price: 1 });
    else if (sort === "price-high") query = query.sort({ price: -1 });
    else if (sort === "rating") query = query.sort({ rating: -1 });
    else if (sort === "newest") query = query.sort({ createdAt: -1 });
    else query = query.sort({ createdAt: -1 });

    if (limit) query = query.limit(parseInt(limit));

    const packages = await query;
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/packages/all — Admin
router.get("/all", auth, async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/packages/:id
router.get("/:id", async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Not found" });
    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/packages — Admin
router.post("/", auth, async (req, res) => {
  try {
    const pkg = await Package.create(req.body);

    // Notify all active subscribers (non-blocking)
    Subscriber.find({ active: true }).then((subscribers) => {
      subscribers.forEach((sub) => {
        sendNewPackageNotification(sub.email, pkg).catch((err) =>
          console.warn(`Package notification to ${sub.email} failed:`, err.message)
        );
      });
    }).catch((err) => console.warn("Failed to fetch subscribers:", err.message));

    res.status(201).json(pkg);
  } catch (error) {
    res.status(400).json({ message: "Validation error", error: error.message });
  }
});

// PUT /api/packages/:id — Admin
router.put("/:id", auth, async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });
    if (!pkg) return res.status(404).json({ message: "Not found" });
    res.json(pkg);
  } catch (error) {
    res.status(400).json({ message: "Update error", error: error.message });
  }
});

// DELETE /api/packages/:id — Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Package deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
