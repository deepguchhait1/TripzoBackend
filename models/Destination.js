import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    tags: [{ type: String }],
    category: {
      type: String,
      enum: ["heritage", "beach", "mountain", "nature", "spiritual", "adventure"],
      required: true,
    },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);
export default Destination;
