import mongoose from "mongoose";

const trainSchema = new mongoose.Schema(
  {
    trainNo: { type: String, required: true, trim: true },
    trainName: { type: String, required: true, trim: true },
    source: { type: String, required: true, trim: true, uppercase: true },
    destination: { type: String, required: true, trim: true, uppercase: true },
    departure: { type: String, required: true, trim: true },
    arrival: { type: String, required: true, trim: true },
    distance: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Train = mongoose.models.Train || mongoose.model("Train", trainSchema);

export default Train;
