import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    avatar: { type: String, default: "" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },
    tour: { type: String, required: true },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
