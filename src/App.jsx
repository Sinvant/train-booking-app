import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import TrainList from './pages/TrainList';
import TrainDetails from './pages/TrainDetails';
import SeatSelection from './pages/SeatSelection';
import BookingConfirmation from './pages/BookingConfirmation';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';

export default function App() {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/trains" element={<TrainList />} />
          <Route path="/train/:id" element={<TrainDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/seat-selection"
            element={
              <ProtectedRoute>
                <SeatSelection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking-confirmation"
            element={
              <ProtectedRoute>
                <BookingConfirmation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}
