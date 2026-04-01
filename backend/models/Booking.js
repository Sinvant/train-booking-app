import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trainId: { type: mongoose.Schema.Types.ObjectId, ref: "Train", required: true },
    trainName: { type: String, required: true },
    trainNo: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    seats: { type: [String], required: true, default: [] },
    date: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
