import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrain } from '../context/TrainContext';
import { validateSearchParams } from '../utils/validation';
import ErrorMessage from '../components/ErrorMessage';
import { Search, ArrowRight } from 'lucide-react';

function Home() {
  const navigate = useNavigate();
  const { setSearch } = useTrain();
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validation = validateSearchParams(
      formData.source,
      formData.destination
    );

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSearch(formData);
    navigate('/trains');
  };

  // Popular routes
  const popularRoutes = [
    { source: 'BBS', destination: 'BNC', name: 'Bhubaneswar → Bangalore' },
    { source: 'HWH', destination: 'MAS', name: 'Howrah → Chennai' },
    { source: 'NDLS', destination: 'BBS', name: 'New Delhi → Bhubaneswar' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Train Tickets
          </h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Fast, Reliable, and Easy Railway Booking System
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10 mb-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Trains</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Source Station */}
              <div>
                <label htmlFor="source" className="block text-gray-700 font-semibold mb-2">
                  From (Station Code)
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  placeholder="e.g., BBS, HWH, NDLS"
                  value={formData.source}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-semibold uppercase transition focus:outline-none ${
                    errors.source
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-300 focus:border-blue-600'
                  }`}
                />
                {errors.source && (
                  <p className="text-red-600 text-sm mt-1">{errors.source}</p>
                )}
              </div>

              {/* Destination Station */}
              <div>
                <label htmlFor="destination" className="block text-gray-700 font-semibold mb-2">
                  To (Station Code)
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  placeholder="e.g., BNC, MAS, NDLS"
                  value={formData.destination}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-lg font-semibold uppercase transition focus:outline-none ${
                    errors.destination
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-300 focus:border-blue-600'
                  }`}
                />
                {errors.destination && (
                  <p className="text-red-600 text-sm mt-1">{errors.destination}</p>
                )}
              </div>

            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-4 px-6 rounded-lg text-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
            >
              <Search size={24} />
              Search Trains
            </button>
          </form>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Popular Routes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularRoutes.map((route, index) => (
            <button
              key={index}
              onClick={() => {
                setFormData({
                  ...formData,
                  source: route.source,
                  destination: route.destination,
                });
                setSearch({
                  source: route.source,
                  destination: route.destination,
                });
              }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 text-left transition border-2 border-transparent hover:border-blue-600"
            >
              <p className="text-gray-600 text-sm font-semibold">POPULAR ROUTE</p>
              <p className="text-xl font-bold text-gray-800 mt-2 flex items-center gap-2">
                {route.source}
                <ArrowRight size={20} className="text-blue-600" />
                {route.destination}
              </p>
              <p className="text-gray-600 text-sm mt-3">{route.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Booking</h3>
              <p className="text-gray-600">
                Complete your booking in just a few clicks. Quick and hassle-free process.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Your payment information is encrypted and secure. Safe transactions guaranteed.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Get the best deals and exclusive offers on train tickets across India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;