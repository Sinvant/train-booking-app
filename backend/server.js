import crypto from "crypto";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Booking from "./models/Booking.js";
import Train from "./models/Train.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://Sinvant:qwerty1234@cluster0.bswwad4.mongodb.net/?appName=Cluster0";

app.use(cors());
app.use(express.json());

const stationNames = {
  BBS: "Bhubaneswar",
  BNC: "Bangalore Cantonment",
  HWH: "Howrah",
  MAS: "Chennai Central",
  NDLS: "New Delhi",
};

const resolveStationCodes = (input) => {
  const raw = String(input || "").trim().toUpperCase();
  if (!raw) return [];

  const codes = new Set();

  if (stationNames[raw]) {
    codes.add(raw);
  }

  for (const [code, name] of Object.entries(stationNames)) {
    if (name.toUpperCase().includes(raw)) {
      codes.add(code);
    }
  }

  if (codes.size === 0) {
    codes.add(raw);
  }

  return [...codes];
};

const seedTrains = [
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

const normalizeTrain = (train) => {
  const _id = String(train._id);
  return {
    _id,
    trainName: train.trainName,
    source: train.source,
    destination: train.destination,
    departure: train.departure,
    arrival: train.arrival,
    distance: train.distance,
    "Train No": train.trainNo,
    "train Name": train.trainName,
    "Departure time": train.departure,
    "Arrival time": train.arrival,
    Distance: train.distance,
    "Source Station Code": train.source,
    "Destination station Code": train.destination,
    "source Station Name": stationNames[train.source] || train.source,
    "Destination Station Name": stationNames[train.destination] || train.destination,
  };
};

const createToken = () => `token-${crypto.randomBytes(24).toString("hex")}`;

const requireAuth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization || "";
  const [type, token] = authorizationHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findOne({ token }).lean();
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;
  return next();
};

const connectAndSeed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log(`MongoDB connected: ${MONGO_URI}`);

  for (const train of seedTrains) {
    await Train.updateOne({ trainNo: train.trainNo }, { $setOnInsert: train }, { upsert: true });
  }
  console.log(`Ensured seed trains: ${seedTrains.length}`);
};

app.get("/", (req, res) => {
  res.send("Train Reservation Backend Running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Frontend successfully connected to backend." });
});

app.get("/api/trains", async (req, res) => {
  const trains = await Train.find().sort({ createdAt: 1 }).lean();
  res.json(trains.map(normalizeTrain));
});

app.get("/api/trains/search", async (req, res) => {
  const sourceInput = String(req.query.source || "").trim();
  const destinationInput = String(req.query.destination || "").trim();
  const sourceCodes = resolveStationCodes(sourceInput);
  const destinationCodes = resolveStationCodes(destinationInput);

  const query = {};
  if (sourceCodes.length) query.source = { $in: sourceCodes };
  if (destinationCodes.length) query.destination = { $in: destinationCodes };

  const trains = await Train.find(query).sort({ departure: 1 }).lean();
  res.json(trains.map(normalizeTrain));
});

app.get("/api/trains/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Train not found." });
  }

  const train = await Train.findById(req.params.id).lean();
  if (!train) {
    return res.status(404).json({ message: "Train not found." });
  }

  return res.json(normalizeTrain(train));
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body || {};
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!name || !normalizedEmail || !password) {
    return res.status(400).json({ message: "Name, email and password are required." });
  }

  const existing = await User.findOne({ email: normalizedEmail }).lean();
  if (existing) {
    return res.status(409).json({ message: "User already exists." });
  }

  const token = createToken();
  const user = await User.create({
    name: String(name).trim(),
    email: normalizedEmail,
    password: String(password),
    token,
  });

  return res.status(201).json({
    id: String(user._id),
    name: user.name,
    email: user.email,
    token: user.token,
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!normalizedEmail || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email: normalizedEmail });
  if (!user || user.password !== String(password)) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  user.token = createToken();
  await user.save();

  return res.json({
    id: String(user._id),
    name: user.name,
    email: user.email,
    token: user.token,
  });
});

app.post("/api/bookings", requireAuth, async (req, res) => {
  const { trainId, seats, date } = req.body || {};

  if (!mongoose.Types.ObjectId.isValid(trainId)) {
    return res.status(404).json({ message: "Train not found." });
  }

  if (!Array.isArray(seats) || seats.length === 0 || !date) {
    return res.status(400).json({ message: "trainId, seats and date are required." });
  }

  const train = await Train.findById(trainId).lean();
  if (!train) {
    return res.status(404).json({ message: "Train not found." });
  }

  const booking = await Booking.create({
    userId: req.user._id,
    trainId: train._id,
    trainName: train.trainName,
    trainNo: train.trainNo,
    source: train.source,
    destination: train.destination,
    departure: train.departure.slice(0, 5),
    arrival: train.arrival.slice(0, 5),
    seats: seats.map((seat) => String(seat)),
    date: String(date),
    price: seats.length * (500 + Math.floor(train.distance / 10)),
    status: "confirmed",
  });

  return res.status(201).json({
    _id: String(booking._id),
    trainId: String(booking.trainId),
    trainName: booking.trainName,
    trainNo: booking.trainNo,
    source: booking.source,
    destination: booking.destination,
    departure: booking.departure,
    arrival: booking.arrival,
    seats: booking.seats,
    date: booking.date,
    price: booking.price,
    status: booking.status,
    createdAt: booking.createdAt,
  });
});

app.get("/api/bookings", requireAuth, async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 }).lean();

  res.json(
    bookings.map((booking) => ({
      _id: String(booking._id),
      trainId: String(booking.trainId),
      trainName: booking.trainName,
      trainNo: booking.trainNo,
      source: booking.source,
      destination: booking.destination,
      departure: booking.departure,
      arrival: booking.arrival,
      seats: booking.seats,
      date: booking.date,
      price: booking.price,
      status: booking.status,
      createdAt: booking.createdAt,
    }))
  );
});

app.delete("/api/bookings/:id", requireAuth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(404).json({ message: "Booking not found." });
  }

  const booking = await Booking.findOne({ _id: req.params.id, userId: req.user._id });
  if (!booking) {
    return res.status(404).json({ message: "Booking not found." });
  }

  booking.status = "cancelled";
  await booking.save();

  return res.json({
    message: "Booking cancelled successfully.",
    booking: {
      _id: String(booking._id),
      status: booking.status,
    },
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error." });
});

connectAndSeed()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(`Failed to start backend: ${error.message}`);
    process.exit(1);
  });
