const express = require("express");
const router = express.Router();
const Testimonial = require("../models/Testimonial");
const auth = require("../middleware/auth");

// GET /api/testimonials — Public
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ active: true }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /api/testimonials/all — Admin
router.get("/all", auth, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// POST /api/testimonials — Admin
router.post("/", auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: "Validation error", error: error.message });
  }
});

// POST /api/testimonials/submit — Public (user review, inactive until approved)
router.post("/submit", async (req, res) => {
  try {
    const { name, location, rating, text, tour } = req.body;

    if (!name || !location || !rating || !text || !tour) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }
    if (text.length < 10 || text.length > 1000) {
      return res.status(400).json({ message: "Review must be between 10 and 1000 characters" });
    }

    const testimonial = await Testimonial.create({
      name: name.trim(),
      location: location.trim(),
      rating,
      text: text.trim(),
      tour: tour.trim(),
      active: false,
    });

    res.status(201).json({ message: "Thank you! Your review has been submitted and will appear after approval.", testimonial });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// PUT /api/testimonials/:id — Admin
router.put("/:id", auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );
    if (!testimonial) return res.status(404).json({ message: "Not found" });
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: "Update error", error: error.message });
  }
});

// DELETE /api/testimonials/:id — Admin
router.delete("/:id", auth, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Testimonial deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
