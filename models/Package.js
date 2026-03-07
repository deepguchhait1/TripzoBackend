const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    destinations: [{ type: String }],
    image: { type: String, required: true },
    images: [{ type: String }],
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    highlights: [{ type: String }],
    included: [{ type: String }],
    tags: [{ type: String }],
    category: {
      type: String,
      enum: ["popular", "adventure", "luxury", "honeymoon", "budget", "family"],
      required: true,
    },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", packageSchema);
