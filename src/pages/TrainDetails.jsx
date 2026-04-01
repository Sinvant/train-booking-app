import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trainAPI } from "../services/api";

export default function TrainDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const data = await trainAPI.getTrainDetails(id);
        setTrain(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrain();
  }, [id]);

  if (!train) return <h2 className="p-8">Loading...</h2>;

  const distance = train.Distance || train.distance || 0;
  const basePrice = 500 + Math.floor(distance / 10);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{train.trainName}</h1>

      <div className="bg-white p-6 rounded shadow">
        <p className="mb-2">
          <strong>Route:</strong> {train.source} → {train.destination}
        </p>

        <p className="mb-2">
          <strong>Departure:</strong> {train.departure}
        </p>

        <p className="mb-2">
          <strong>Arrival:</strong> {train.arrival}
        </p>

        <p className="mb-4">
          <strong>Distance:</strong> {train.distance} km
        </p>

        <button
          onClick={() => navigate('/seat-selection', { state: { train, price: basePrice } })}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
