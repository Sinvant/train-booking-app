import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header>
      <Link to="/" className="brand">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <rect width="48" height="48" rx="10" fill="url(#g)" />
          <path d="M12 30c3-3 9-3 12 0s9 3 12 0" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
          <path d="M10 22h28" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.9"/>
          <defs>
            <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#0b5cff"/>
              <stop offset="1" stopColor="#03a9f4"/>
            </linearGradient>
          </defs>
        </svg>
        Indian Train
      </Link>

      <div className="nav">
        <div className="search">
          <input placeholder="Search trains, stations..." aria-label="search" />
        </div>
        <Link to="/bookings" className="secondary">My Bookings</Link>
      </div>
    </header>
  )
}
