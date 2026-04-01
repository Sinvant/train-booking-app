# Indian Train Reservation — Frontend

This is a minimal React + Vite frontend prototype for an Indian train reservation system. It uses mock data and runs locally without a backend.

Quick start (Windows PowerShell):

```powershell
npm install
npm run dev
```

Open http://localhost:5173

Features added:
- Home page with featured content
- Bookings page (saved to `localStorage`) with view/delete
- Booking persistence on confirmation (saved as PNR)

Files to look at:
- [src/pages/Home.jsx](src/pages/Home.jsx)
- [src/pages/Bookings.jsx](src/pages/Bookings.jsx)
- [src/components/TrainDetails.jsx](src/components/TrainDetails.jsx)
- [src/components/SeatSelector.jsx](src/components/SeatSelector.jsx)
- [src/components/BookingForm.jsx](src/components/BookingForm.jsx)
- [src/pages/BookingConfirmation.jsx](src/pages/BookingConfirmation.jsx)
