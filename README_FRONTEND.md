# Train Reservation System - Frontend

A modern, production-ready Train Reservation System frontend built with React, featuring a complete booking workflow from train search to payment confirmation.

## Features

### 🚂 Core Features
- **Train Search**: Search trains by source, destination, and date
- **Train Listing**: Display matching trains with sorting options (departure time, price, duration)
- **Seat Selection**: Interactive seat grid for selecting multiple seats
- **Booking Confirmation**: Complete booking details and payment confirmation
- **My Bookings**: View, manage, and cancel previous bookings

### 🔐 Authentication & Security
- User registration and login
- JWT token-based authentication
- Protected routes for booking flows
- Persistent authentication state with localStorage

### 💻 User Interface
- Modern, responsive design with Tailwind CSS
- Mobile-first approach with breakpoints for all devices
- Smooth animations and transitions
- Loading states and error handling
- Interactive components with lucide-react icons

### 🏗️ Architecture
- **React Hooks**: Functional components with custom hooks
- **Context API**: Global state management for trains and authentication
- **Axios**: HTTP client for API calls with interceptors
- **React Router DOM**: Client-side routing with protected routes
- **Code Splitting**: Lazy loading and route-based code splitting

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation bar with auth
│   ├── Footer.jsx              # Footer section
│   ├── TrainCard.jsx           # Individual train card component
│   ├── SeatGrid.jsx            # Interactive seat selection
│   ├── LoadingSpinner.jsx      # Loading indicator
│   ├── ErrorMessage.jsx        # Error display component
│   └── ProtectedRoute.jsx      # Route protection HOC
├── context/
│   ├── AuthContext.jsx         # Authentication context
│   └── TrainContext.jsx        # Train data context
├── pages/
│   ├── Home.jsx                # Landing page with search
│   ├── TrainList.jsx           # Train listing and filtering
│   ├── SeatSelection.jsx       # Seat selection page
│   ├── BookingConfirmation.jsx # Booking confirmation page
│   ├── Login.jsx               # Login page
│   ├── Register.jsx            # Registration page
│   └── MyBookings.jsx          # User bookings history
├── services/
│   └── api.js                  # Axios instance and API calls
├── utils/
│   ├── formatters.js           # Data formatting utilities
│   └── validation.js           # Form validation helpers
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
├── index.css                   # Tailwind CSS styles
└── vite.config.js              # Vite configuration
```

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Backend API running on `http://localhost:5000`

### Installation Steps

1. **Clone the repository**
```bash
cd d:\TRS
```

2. **Install dependencies**
```bash
npm install
```

3. **Install Tailwind CSS (if not already installed)**
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

4. **Configure environment**
Create a `.env` file (optional for customization):
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## API Integration

### Base URL
```
http://localhost:5000/api
```

### API Endpoints Used

#### Train Endpoints
- `GET /trains/search?source=BBS&destination=BNC&date=2024-02-20` - Search trains
- `GET /trains/:id` - Get train details
- `GET /trains` - Get all trains
- `GET /trains/:id/seats?date=2024-02-20` - Get available seats

#### Booking Endpoints
- `POST /bookings` - Create booking
- `GET /bookings` - Get user bookings
- `GET /bookings/:id` - Get booking details
- `DELETE /bookings/:id` - Cancel booking

#### Auth Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

## Usage Guide

### 1. **Home Page**
- Enter source station code (e.g., BBS, HWH, NDLS)
- Enter destination station code
- Select journey date
- Click "Search Trains"

### 2. **Train List**
- View all matching trains
- Sort by: Departure Time, Price, Duration
- Click "Select Train" to proceed to seat selection

### 3. **Seat Selection** (Protected Route)
- Select one or more seats from the grid
- Enter passenger details
- Review price breakdown
- Click "Continue to Booking"

### 4. **Booking Confirmation** (Protected Route)
- Final booking summary
- Passenger details review
- Price breakdown with GST
- Download/Print ticket options

### 5. **My Bookings** (Protected Route)
- View all previous bookings
- See booking status
- Cancel confirmed bookings
- View detailed booking information

## Authentication Flow

1. **Register** (Optional)
   - Fill registration form with name, email, password
   - Auto-login after successful registration
   
2. **Login**
   - Enter email and password
   - Token stored in localStorage
   - Persistent login with context initialization

3. **Protected Routes**
   - Routes require authentication
   - Auto-redirect to login if not authenticated
   - Token sent in Authorization header for API calls

## Component Details

### Navbar
- Responsive navigation with mobile menu
- User info display
- Login/Logout functionality
- Quick links to key pages

### TrainCard
- Responsive train information display
- Price calculation based on distance
- One-click selection
- Mobile-optimized layout

### SeatGrid
- Interactive 6-column seat layout
- Visual feedback for selected/booked seats
- Real-time capacity tracking
- Legend for seat status

### LoadingSpinner
- Smooth rotation animation
- Customizable loading message
- Centered positioning

### ProtectedRoute
- HOC for route protection
- Auto-redirect to login
- Seamless user experience

## Styling & Responsive Design

### Tailwind CSS
- Mobile-first responsive breakpoints
- sm: 640px, md: 768px, lg: 1024px, xl: 1280px
- Custom utility classes in index.css
- Smooth transitions and animations

### Responsive Behavior
- Mobile: Single column layouts
- Tablet: Two column layouts (where applicable)
- Desktop: Multi-column layouts
- Touch-friendly buttons and inputs

## State Management

### AuthContext
```javascript
{
  user: { id, email, name, token },
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string,
  login: function,
  register: function,
  logout: function,
  initializeAuth: function
}
```

### TrainContext
```javascript
{
  trains: [],
  selectedTrain: null,
  searchParams: { source, destination, date },
  isLoading: boolean,
  error: string,
  setSearch: function,
  selectTrain: function,
  updateTrains: function,
  // ... more functions
}
```

## Error Handling

- **API Errors**: Caught and displayed in ErrorMessage component
- **Validation Errors**: Form-level validation with field-specific errors
- **Authentication Errors**: 401 responses trigger logout
- **Network Errors**: User-friendly error messages with retry options

## Performance Optimizations

- **Code Splitting**: Route-based component loading
- **Memoization**: React.memo for prevent unnecessary rerenders
- **Lazy Loading**: Deferred loading of heavy components
- **Optimized Rendering**: useCallback and useEffect dependencies
- **Efficient State**: Context API instead of prop drilling

## Testing Features

### Mock Data
- Demo credentials available on login page
- Mock API responses for development
- Sample train data in train list

### Demo Credentials
- Email: `demo@example.com`
- Password: `password123`

## Browser Support

- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Troubleshooting

### Port Already in Use
```bash
# Change default port in vite.config.js
```

### API Connection Issues
- Ensure backend is running on `http://localhost:5000`
- Check CORS configuration on backend
- Verify API endpoint URLs

### Styling Not Applied
- Clear node_modules and reinstall
- Restart development server
- Check Tailwind CSS configuration

## Future Enhancements

- [ ] Payment gateway integration (Stripe, Razorpay)
- [ ] Real-time seat availability updates with WebSocket
- [ ] SMS/Email notifications
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Advanced filtering options
- [ ] Booking cancellation refund processing
- [ ] Ticket barcode/QR code generation
- [ ] Reviews and ratings system
- [ ] Admin dashboard for train management

## Dependencies

### Core
- react@18.2.0
- react-dom@18.2.0
- react-router-dom@6.14.1
- axios@1.4.0

### UI & Icons
- tailwindcss@3.3.0
- lucide-react@0.294.0

### Dev Tools
- vite@5.1.3
- autoprefixer@10.4.16
- postcss@8.4.31

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please create an issue in the repository or contact the development team.

---

**Built with ❤️ for seamless train booking experience**
