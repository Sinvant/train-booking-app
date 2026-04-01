import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTrain } from '../context/TrainContext';
import ProtectedRoute from '../components/ProtectedRoute';
import SeatGrid from '../components/SeatGrid';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { formatTime, formatCurrency, getStationName } from '../utils/formatters';

// Seeded pseudo-random number generator (Mulberry32)
// Produces a stable sequence for a given seed — same train + date = same occupied seats
function seededRandom(seed) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Convert a string (trainId + date) into a numeric seed
function stringToSeed(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

// Generate a stable set of occupied seat IDs for a given train and date
// Occupancy is realistic: 40–70% of seats filled, clustered in realistic patterns
function generateOccupiedSeats(totalSeats, trainId, date) {
  const seedStr = `${trainId}-${date || 'default'}`;
  const rand = seededRandom(stringToSeed(seedStr));

  // Decide occupancy rate between 40% and 70%
  const occupancyRate = 0.40 + rand() * 0.30;
  const targetOccupied = Math.floor(totalSeats * occupancyRate);

  const occupied = new Set();

  // Fill seats in a realistic clustered pattern:
  // Seats are numbered 1..totalSeats; fill in blocks with small gaps
  let seat = 1;
  while (occupied.size < targetOccupied && seat <= totalSeats) {
    // Decide a block size (1–4 consecutive seats)
    const blockSize = Math.floor(rand() * 4) + 1;
    const shouldFill = rand() > 0.35; // ~65% chance to fill a block

    if (shouldFill) {
      for (let i = 0; i < blockSize && seat <= totalSeats && occupied.size < targetOccupied; i++) {
        occupied.add(seat);
        seat++;
      }
    } else {
      // Skip 1–3 seats (gap)
      seat += Math.floor(rand() * 3) + 1;
    }
  }

  return occupied;
}

export default function SeatSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { searchParams } = useTrain();
  const { train, price } = location.state || {};
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerDetails, setPassengerDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Stable occupied seats derived from train identity + travel date
  const occupiedSeats = useMemo(() => {
    if (!train) return new Set();
    const trainId = train._id || train.id || train['Train No'] || 'unknown';
    const date = searchParams?.date || '';
    return generateOccupiedSeats(72, trainId, date);
  }, [train, searchParams?.date]);

  if (!train) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Train Selected</h2>
          <button
            onClick={() => navigate('/trains')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
          >
            Go Back to Trains
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <ProtectedRoute>
        <SeatSelectionContent
          train={train}
          price={price}
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          passengerDetails={passengerDetails}
          setPassengerDetails={setPassengerDetails}
          navigate={navigate}
          occupiedSeats={occupiedSeats}
        />
      </ProtectedRoute>
    );
  }

  return (
    <SeatSelectionContent
      train={train}
      price={price}
      selectedSeats={selectedSeats}
      setSelectedSeats={setSelectedSeats}
      passengerDetails={passengerDetails}
      setPassengerDetails={setPassengerDetails}
      navigate={navigate}
      searchParams={searchParams}
      occupiedSeats={occupiedSeats}
    />
  );
}

function SeatSelectionContent({
  train,
  price,
  selectedSeats,
  setSelectedSeats,
  passengerDetails,
  setPassengerDetails,
  navigate,
  searchParams,
  occupiedSeats,
}) {
  const stations = getStationName(train);
  const trainNo = train['Train No']?.["'"] || train['Train No'] || 'N/A';
  const trainName = train['train Name'] || 'Unknown';
  const departure = formatTime(train['Departure time']);
  const arrival = formatTime(train['Arrival time']);
  const totalPrice = price * selectedSeats.length;

  const handlePassengerChange = (e) => {
    const { name, value } = e.target;
    setPassengerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guard: prevent selecting an occupied seat (safety net in case SeatGrid doesn't filter)
  const handleSelectSeats = (seats) => {
    const validSeats = seats.filter((id) => !occupiedSeats.has(id));
    setSelectedSeats(validSeats);
  };

  const handleContinueBooking = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    if (!passengerDetails.name || !passengerDetails.email || !passengerDetails.phone) {
      alert('Please fill in all passenger details');
      return;
    }

    navigate('/booking-confirmation', {
      state: {
        train: {
          ...train,
          _id: train._id || train.id,
        },
        selectedSeats,
        price,
        totalPrice,
        passengerDetails,
        date: searchParams?.date,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-6 transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{trainName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Train Number</p>
              <p className="font-bold text-lg">{trainNo}</p>
            </div>
            <div>
              <p className="text-gray-600">Departure</p>
              <p className="font-bold text-lg">{departure}</p>
            </div>
            <div>
              <p className="text-gray-600">Arrival</p>
              <p className="font-bold text-lg">{arrival}</p>
            </div>
            <div>
              <p className="text-gray-600">From → To</p>
              <p className="font-bold text-lg">
                {stations.sourceCode || stations.source} → {stations.destinationCode || stations.destination}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Seat Selection — pass stable occupiedSeats to SeatGrid */}
            <SeatGrid
              totalSeats={72}
              selectedSeats={selectedSeats}
              onSelectSeats={handleSelectSeats}
              occupiedSeats={occupiedSeats}   // <-- stable, seeded occupied set
            />

            {/* Passenger Details */}
            <div className="bg-white rounded-lg shadow-md p-8 mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Passenger Details</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={passengerDetails.name}
                    onChange={handlePassengerChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={passengerDetails.email}
                    onChange={handlePassengerChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={passengerDetails.phone}
                    onChange={handlePassengerChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="h-fit">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Booking Summary</h3>

              <div className="space-y-4 pb-4 border-b-2 border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare (Per Seat)</span>
                  <span className="font-bold">{formatCurrency(price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Number of Seats</span>
                  <span className="font-bold">{selectedSeats.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (5%)</span>
                  <span className="font-bold">{formatCurrency(totalPrice * 0.05)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 mb-6">
                <span className="text-xl font-bold text-gray-800">Total Amount</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(totalPrice * 1.05)}
                </span>
              </div>

              {selectedSeats.length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Selected Seats:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map((id) => (
                      <span
                        key={id}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold"
                      >
                        Seat {id}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleContinueBooking}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
              >
                <CheckCircle size={20} />
                Continue to Booking
              </button>

              <button
                onClick={() => navigate(-1)}
                className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
