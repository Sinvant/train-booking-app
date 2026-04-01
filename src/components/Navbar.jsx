import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-700 font-bold">🚂</span>
            </div>
            <span>TrainBooking</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            {isAuthenticated && (
              <Link to="/my-bookings" className="hover:text-blue-200 transition">
                My Bookings
              </Link>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User size={20} />
                  <span className="text-sm font-medium">{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-blue-500">
            <Link
              to="/"
              className="block py-2 hover:text-blue-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/my-bookings"
                className="block py-2 hover:text-blue-200"
                onClick={() => setIsOpen(false)}
              >
                My Bookings
              </Link>
            )}
            <hr className="my-2 border-blue-500" />
            {isAuthenticated ? (
              <>
                <div className="py-2 text-sm">
                  <User size={18} className="inline mr-2" />
                  {user?.name || user?.email}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:text-blue-200"
                >
                  <LogOut size={18} className="inline mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block py-2 hover:text-blue-200"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 hover:text-blue-200"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
