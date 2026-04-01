import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Home as HomeIcon, Printer } from 'lucide-react';
import { bookingAPI } from '../services/api';
import { formatCurrency, formatTime, getStationName } from '../utils/formatters';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, selectedSeats, totalPrice, passengerDetails, date } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState('');

  if (!train) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Booking Data Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const stations = getStationName(train);
  const trainId = train._id;
  const trainNo = train['Train No']?.["'"] || train['Train No'] || 'N/A';
  const trainName = train['train Name'] || train.trainName || 'Unknown';
  const departure = formatTime(train['Departure time'] || train.departure);
  const arrival = formatTime(train['Arrival time'] || train.arrival);
  const safeTotal = Number(totalPrice || 0);
  const gst = safeTotal * 0.05;
  const finalTotal = safeTotal + gst;

  const handleConfirmBooking = async () => {
    if (!trainId || !selectedSeats?.length) {
      setError('Invalid booking data. Please reselect your train and seats.');
      return;
    }
     console.log("trainId:", trainId);
     console.log("selectedSeats:", selectedSeats);
    setError('');
    setIsProcessing(true);

    try {
  console.log("🚀 Sending booking...");
  console.log("trainId:", trainId);
  console.log("seats:", selectedSeats);
  console.log("date:", date);

  const booking = await bookingAPI.createBooking(
    trainId,
    selectedSeats.map(String),
    date || new Date().toISOString().slice(0, 10)
  );

  console.log("✅ Booking response:", booking);

  setBookingId(booking._id || booking.id);
  alert('Booking successful.');
} catch (err) {
  console.error("❌ FULL ERROR:", err);
  setError(err);
}
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-green-700">Confirm Your Booking</h1>
              <p className="text-green-600">
                Review details below and submit to create your booking.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8 print:shadow-none">
              <div className="mb-6 pb-6 border-b-2 border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Booking Reference</h2>
                <div className="text-3xl font-bold text-blue-600 font-mono">
                  {bookingId || 'Not generated yet'}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Passenger Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Name</p>
                    <p className="font-bold text-gray-800">{passengerDetails?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-bold text-gray-800">{passengerDetails?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="font-bold text-gray-800">{passengerDetails?.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 print:shadow-none">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Train Details</h3>

              <div className="mb-8">
                <h4 className="font-bold text-gray-800 text-lg mb-4">{trainName}</h4>
                <p className="text-gray-600 text-sm mb-4">Train #{trainNo}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-600 text-xs uppercase font-semibold">Departure</p>
                    <p className="text-2xl font-bold text-gray-800">{departure}</p>
                    <p className="text-gray-700 font-semibold mt-2">
                      {stations.source || stations.sourceCode}
                    </p>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full w-24 mx-auto mb-2"></div>
                      <p className="text-xs text-gray-600 font-semibold">{train.Distance || train.distance || 0} km</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-gray-600 text-xs uppercase font-semibold">Arrival</p>
                    <p className="text-2xl font-bold text-gray-800">{arrival}</p>
                    <p className="text-gray-700 font-semibold mt-2">
                      {stations.destination || stations.destinationCode}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-gray-200">
                <h4 className="font-bold text-gray-800 mb-4">Seats Booked</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSeats?.map((seat, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold text-sm"
                    >
                      Seat {seat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="h-fit">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4 print:shadow-none">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Price Breakdown</h3>

              <div className="space-y-4 pb-4 border-b-2 border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticket Fare</span>
                  <span className="font-bold">{formatCurrency(safeTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (5%)</span>
                  <span className="font-bold">{formatCurrency(gst)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 mb-8">
                <span className="text-lg font-bold text-gray-800">Total Amount</span>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(finalTotal)}
                </span>
              </div>

              {error && (
                <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-3 print:hidden">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <Printer size={18} />
                  Print Ticket
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={isProcessing || !!bookingId}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition"
                >
                  {bookingId
                    ? 'Booking Created'
                    : isProcessing
                    ? 'Processing...'
                    : 'Confirm Booking'}
                </button>
                <button
                  onClick={() => navigate('/my-bookings')}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition"
                >
                  View My Bookings
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <HomeIcon size={18} />
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
