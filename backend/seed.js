import mongoose from "mongoose";
import Train from "./models/Train.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/TRS";

const trains = [
  {
    trainNo: "00851",
    trainName: "BNC SUVIDHA SPL",
    source: "BBS",
    destination: "BNC",
    departure: "22:50:00",
    arrival: "06:30:00",
    distance: 1512,
  },
  {
    trainNo: "12839",
    trainName: "HOWRAH MAIL",
    source: "HWH",
    destination: "MAS",
    departure: "23:55:00",
    arrival: "04:45:00",
    distance: 1662,
  },
  {
    trainNo: "22692",
    trainName: "KSR BENGALURU RAJDHANI",
    source: "NDLS",
    destination: "BNC",
    departure: "20:50:00",
    arrival: "05:40:00",
    distance: 2365,
  },
  {
    trainNo: "22823",
    trainName: "RAJDHANI EXPRESS",
    source: "NDLS",
    destination: "BBS",
    departure: "17:10:00",
    arrival: "11:15:00",
    distance: 1725,
  },
];

const run = async () => {
  await mongoose.connect(MONGO_URI);
  await Train.deleteMany({});
  await Train.insertMany(trains);
  console.log(`Inserted ${trains.length} trains into ${MONGO_URI}`);
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error("Seed failed:", error.message);
  process.exit(1);
});
