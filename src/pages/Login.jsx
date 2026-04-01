import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      // Error state is handled in AuthContext.
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🚂</span>
            <h1 className="text-3xl font-bold text-blue-600">TrainBooking</h1>
          </div>
          <p className="text-gray-600">Log in to your account</p>
        </div>

        {/* Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition focus:outline-none ${
                  errors.email
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-gray-300 focus:border-blue-600'
                }`}
              />
            </div>
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-12 pr-12 py-3 border-2 rounded-lg transition focus:outline-none ${
                  errors.password
                    ? 'border-red-500 focus:border-red-600'
                    : 'border-gray-300 focus:border-blue-600'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition transform hover:scale-105"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">Don't have an account?</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Register Link */}
        <Link
          to="/register"
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition text-center block"
        >
          Create Account
        </Link>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
          <p className="text-xs text-blue-800">Email: demo@example.com</p>
          <p className="text-xs text-blue-800">Password: password123</p>
        </div>
      </div>
    </div>
  );
}
