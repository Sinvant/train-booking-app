import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { bookingAPI } from '../services/api';
import { formatCurrency } from '../utils/formatters';
import { Ticket, X, MoreVertical } from 'lucide-react';

export default function MyBookings() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await bookingAPI.getUserBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(typeof err === 'string' ? err : 'Failed to fetch bookings');
        console.error('Error fetching bookings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [isAuthenticated, navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingAPI.cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((b) =>
          (b._id || b.id) === bookingId ? { ...b, status: 'cancelled' } : b
        )
      );
      alert('Booking cancelled successfully');
      setActiveMenu(null);
    } catch (err) {
      alert('Failed to cancel booking');
      console.error('Error cancelling booking:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <ProtectedRoute>
        <div>Loading...</div>
      </ProtectedRoute>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Bookings</h1>
          <p className="text-gray-600 mt-2">Manage and view your train bookings</p>
        </div>

        {error && <ErrorMessage message={error} onClose={() => setError(null)} />}

        {isLoading ? (
          <LoadingSpinner message="Loading your bookings..." />
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't made any bookings yet. Start by searching for trains!
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Search Trains
            </button>
          </div>
        ) : (
          <div className="space-y-6 mb-8">
            {bookings.map((booking) => (
              <div
                key={booking._id || booking.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="p-6">
                  {/* Booking Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{booking.trainName}</h3>
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold">Reference:</span> {booking._id || booking.id}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveMenu(activeMenu === (booking._id || booking.id) ? null : (booking._id || booking.id))
                          }
                          className="p-2 hover:bg-gray-200 rounded-lg transition"
                        >
                          <MoreVertical size={20} className="text-gray-600" />
                        </button>
                        {activeMenu === (booking._id || booking.id) && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                            <button
                              onClick={() => setSelectedBooking(booking)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800 font-semibold"
                            >
                              View Details
                            </button>
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => handleCancelBooking(booking._id || booking.id)}
                                className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 font-semibold border-t border-gray-200"
                              >
                                Cancel Booking
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-gray-600 text-xs uppercase font-semibold">From</p>
                      <p className="text-xl font-bold text-gray-800">{booking.source}</p>
                      <p className="text-sm text-gray-600">Departure: {booking.departure}</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <Ticket className="text-gray-400 mb-2" size={24} />
                      <p className="text-xs text-gray-600 font-semibold">TRAIN #{booking.trainNo || 'N/A'}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-600 text-xs uppercase font-semibold">To</p>
                      <p className="text-xl font-bold text-gray-800">{booking.destination}</p>
                      <p className="text-sm text-gray-600">Arrival: {booking.arrival}</p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-gray-600 text-xs font-semibold">Journey Date</p>
                        <p className="font-bold text-gray-800">
                          {new Date(booking.date).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-semibold">Seats Booked</p>
                        <p className="font-bold text-gray-800">{(booking.seats || []).join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-semibold">Total Fare</p>
                        <p className="font-bold text-green-600">{formatCurrency(booking.price)}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs font-semibold">Number of Seats</p>
                        <p className="font-bold text-gray-800">{(booking.seats || []).length}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      className="flex-grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      View Ticket
                    </button>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelBooking(booking._id || booking.id)}
                        className="flex-grow bg-red-100 hover:bg-red-200 text-red-600 font-bold py-2 px-4 rounded-lg transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-gray-600 text-sm">Booking Reference</p>
                <p className="text-2xl font-bold text-blue-600 font-mono">{selectedBooking._id || selectedBooking.id}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Train Name</p>
                  <p className="font-bold text-gray-800">{selectedBooking.trainName}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Train Number</p>
                  <p className="font-bold text-gray-800">{selectedBooking.trainNo}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">From</p>
                  <p className="font-bold text-gray-800">{selectedBooking.source}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">To</p>
                  <p className="font-bold text-gray-800">{selectedBooking.destination}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Departure</p>
                  <p className="font-bold text-gray-800">{selectedBooking.departure}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Arrival</p>
                  <p className="font-bold text-gray-800">{selectedBooking.arrival}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm">Seats Booked</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(selectedBooking.seats || []).map((seat) => (
                    <span
                      key={seat}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold text-sm"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">Total Amount</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(selectedBooking.price)}</p>
              </div>

              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
