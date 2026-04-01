import React, { useState, useEffect } from 'react';
import { Grid2x2, GripHorizontal } from 'lucide-react';

export default function SeatGrid({ totalSeats = 72, selectedSeats = [], onSelectSeats }) {
  const [seats, setSeats] = useState([]);
  const seatsPerRow = 6;

  // ✅ FIX: run only once (removed selectedSeats dependency)
  useEffect(() => {
    const seatArray = Array.from({ length: totalSeats }, (_, i) => ({
      id: i + 1,
      number: `${Math.floor(i / seatsPerRow) + 1}${String.fromCharCode(65 + (i % seatsPerRow))}`,
      isSelected: false, // optional, not used but kept same structure
      isAvailable: Math.random() > 0.3,
    }));
    setSeats(seatArray);
  }, [totalSeats]); // ❌ removed selectedSeats

  const toggleSeat = (seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat.isAvailable) return;

    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((id) => id !== seatId)
      : [...selectedSeats, seatId];

    onSelectSeats?.(newSelectedSeats);
  };

  const rows = Math.ceil(totalSeats / seatsPerRow);

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Grid2x2 size={24} />
        Select Your Seats
      </h3>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 border-2 border-green-600 rounded"></div>
          <span className="text-sm text-gray-700">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-100 border-2 border-blue-600 rounded"></div>
          <span className="text-sm text-gray-700">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 border-2 border-gray-400 rounded"></div>
          <span className="text-sm text-gray-700">Booked</span>
        </div>
      </div>

      {/* Seats Grid */}
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg p-4 mb-6">
        <div className="text-center mb-4 font-semibold text-gray-700 text-sm"></div>

        <div className="space-y-3">
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <div key={rowIdx} className="flex justify-center gap-3">
              {Array.from({ length: seatsPerRow }).map((_, colIdx) => {
                const seatIndex = rowIdx * seatsPerRow + colIdx;
                if (seatIndex >= totalSeats) return null;

                const seat = seats[seatIndex];
                if (!seat) return null;

                const isSelected = selectedSeats.includes(seat.id);

                return (
                  <button
                    key={seat.id}
                    onClick={() => toggleSeat(seat.id)}
                    disabled={!seat.isAvailable}
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition transform hover:scale-110 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-2 border-blue-700'
                        : seat.isAvailable
                        ? 'bg-green-100 text-gray-700 border-2 border-green-600 hover:bg-green-200'
                        : 'bg-gray-300 text-gray-600 border-2 border-gray-400 cursor-not-allowed'
                    }`}
                    title={seat.number}
                  >
                    {seat.number.charAt(seat.number.length - 1)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Selected Seats Info */}
      {selectedSeats.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-gray-700 font-semibold">
            Selected Seats: <span className="text-blue-600">{selectedSeats.length}</span>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {selectedSeats
              .map((id) => seats.find((s) => s.id === id)?.number)
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}