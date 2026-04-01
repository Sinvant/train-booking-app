import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <span>🚂</span> TrainBooking
            </h3>
            <p className="text-sm">
              Your trusted platform for booking train tickets across India with ease and convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Search Trains
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  My Bookings
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Info</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 text-sm">
          <p>&copy; {currentYear} TrainBooking. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">
              Facebook
            </a>
            <a href="#" className="hover:text-white transition">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
