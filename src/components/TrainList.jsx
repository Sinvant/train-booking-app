import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { trainAPI } from "../services/api";

export default function TrainList() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const data = await trainAPI.getAllTrains();
        setTrains(data);
      } catch (err) {
        console.error("Error fetching trains:", err);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <div className="hero">
        <div>
          <div className="lead">Find and book trains across India</div>
          <div className="sub">
            Quickly search schedules, choose seats, and confirm bookings.
          </div>
        </div>
        <div className="badge">Instant Booking</div>
      </div>

      <h2 style={{ marginTop: 8 }}>Available Trains</h2>

      <div className="train-list">
        {trains.map((t) => (
          <div className="card" key={t._id}>
            <div className="top">
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>
                  {t.trainName}{" "}
                  <span style={{ fontWeight: 600, color: "#374151" }}>
                    — {t["Train No"]}
                  </span>
                </div>
                <div className="meta">
                  {t.source} → {t.destination}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700 }}>
                  {t.departure} → {t.arrival}
                </div>
                <div className="meta">Distance: {t.distance} km</div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <div className="availability">Available</div>

              <div className="actions">
                <Link to={`/train/${t._id}`}>
                  <button>View & Book</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
