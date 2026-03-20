import mongoose from "mongoose";
import crypto from "crypto";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      default: null,
    },
    packageTitle: { type: String, default: "" },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
      default: null,
    },
    destinationTitle: { type: String, default: "" },
    travelers: { type: Number, required: true, min: 1 },
    travelDate: { type: Date, required: true },
    specialRequests: { type: String, default: "" },
    totalPrice: { type: Number, default: 0 },
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    trackingId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
      default: () => crypto.randomBytes(12).toString("hex"),
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
