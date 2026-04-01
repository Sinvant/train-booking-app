import mongoose from "mongoose";
import Train from "./models/Train.js";

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/train_reservation";
const RAW_COLLECTION = process.env.RAW_COLLECTION || "trains_raw";

const toStringSafe = (value) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return String(value).trim();
};

const normalizeCode = (value) => toStringSafe(value).toUpperCase();

const extractTrainNo = (raw) => {
  const v = raw["Train No"];
  if (typeof v === "string" || typeof v === "number") return toStringSafe(v);
  if (v && typeof v === "object") {
    if (v.slno !== undefined) return toStringSafe(v.slno);
    if (v["'"] !== undefined) return toStringSafe(v["'"]);
    const first = Object.values(v)[0];
    if (first !== undefined) return toStringSafe(first);
  }
  return toStringSafe(raw.trainNo);
};

const extractDistance = (raw) => {
  const v = raw.Distance ?? raw.distance ?? raw["Distance"];
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const mapRawToNormalized = (raw) => ({
  trainNo: extractTrainNo(raw),
  trainName: toStringSafe(raw["train Name"] ?? raw.trainName),
  source: normalizeCode(raw["Source Station Code"] ?? raw.source),
  destination: normalizeCode(raw["Destination station Code"] ?? raw.destination),
  departure: toStringSafe(raw["Departure time"] ?? raw.departure),
  arrival: toStringSafe(raw["Arrival time"] ?? raw.arrival),
  distance: extractDistance(raw),
});

const isValidTrain = (t) =>
  t.trainNo && t.trainName && t.source && t.destination && t.departure && t.arrival;

const run = async () => {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;

  const rawCount = await db.collection(RAW_COLLECTION).countDocuments();
  if (rawCount === 0) {
    console.log(`No documents found in '${RAW_COLLECTION}'.`);
    await mongoose.disconnect();
    return;
  }

  console.log(`Reading ${rawCount} raw docs from '${RAW_COLLECTION}'...`);

  const cursor = db.collection(RAW_COLLECTION).find({});
  let ops = [];
  let processed = 0;
  let migrated = 0;
  let skipped = 0;

  while (await cursor.hasNext()) {
    const raw = await cursor.next();
    processed += 1;

    const t = mapRawToNormalized(raw);
    if (!isValidTrain(t)) {
      skipped += 1;
      continue;
    }

    ops.push({
      updateOne: {
        filter: {
          trainNo: t.trainNo,
          source: t.source,
          destination: t.destination,
          departure: t.departure,
        },
        update: { $set: t },
        upsert: true,
      },
    });

    if (ops.length >= 1000) {
      const result = await Train.bulkWrite(ops, { ordered: false });
      migrated += (result.upsertedCount || 0) + (result.modifiedCount || 0);
      ops = [];
      console.log(`Processed ${processed}/${rawCount}...`);
    }
  }

  if (ops.length > 0) {
    const result = await Train.bulkWrite(ops, { ordered: false });
    migrated += (result.upsertedCount || 0) + (result.modifiedCount || 0);
  }

  await Train.collection.createIndex({ source: 1, destination: 1 });
  await Train.collection.createIndex({ trainNo: 1 });

  console.log(`Done. processed=${processed}, migrated=${migrated}, skipped=${skipped}`);
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
