## Train Reservation System Frontend - Complete Setup Guide

This document provides detailed setup instructions and an overview of the complete frontend implementation.

---

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Installation & Setup](#installation--setup)
3. [Project Overview](#project-overview)
4. [File Structure](#file-structure)
5. [Features Overview](#features-overview)
6. [API Integration](#api-integration)
7. [Testing Guide](#testing-guide)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Required
- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher (comes with Node.js)
- **Backend API**: Running on `http://localhost:5000`

### Optional but Recommended
- **Git**: For version control
- **VS Code**: Code editor with extensions:
  - Prettier - Code formatter
  - ESLint - Code quality
  - Tailwind CSS IntelliSense
  - Thunder Client - API testing

### Browser Requirements
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Installation & Setup

### Step 1: Clone/Navigate to Project

```bash
cd d:\TRS
```

### Step 2: Install Dependencies

```bash
npm install
```

**What gets installed:**
- React, React DOM, React Router
- Axios for HTTP requests
- Tailwind CSS for styling
- Lucide React for icons
- Vite as build tool

### Step 3: Verify Backend is Running

Make sure your backend API is running:
```bash
# Should be accessible at:
http://localhost:5000/api
```

Test with curl:
```bash
curl http://localhost:5000/api/trains
```

### Step 4: Start Development Server

```bash
npm run dev
```

You'll see:
```
  VITE v5.1.3  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 5: Open in Browser

- Automatically opens at `http://localhost:5173`
- If not, manually navigate to the URL

---

## Project Overview

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| UI Library | React 18.2 | Component framework |
| Styling | Tailwind CSS 3.3 | Utility-first CSS |
| Routing | React Router 6.14 | Client-side routing |
| State Management | Context API | Global state |
| HTTP Client | Axios 1.4 | API calls |
| Icons | Lucide React | UI icons |
| Build Tool | Vite 5.1 | Fast bundler |

### Key Concepts

#### Context API
- **AuthContext**: User authentication, login/logout, token management
- **TrainContext**: Train search, selection, booking state

#### Protected Routes
- Routes requiring authentication wrapped with `<ProtectedRoute>`
- Auto-redirect to login if not authenticated

#### State Management Flow

```
User Action
    ↓
Component State Update
    ↓
Context Update
    ↓
API Call (if needed)
    ↓
State Update
    ↓
Component Re-render
```

---

## File Structure

### Complete File Listing

```
d:\TRS\
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                 # Navigation bar with auth menu
│   │   ├── Footer.jsx                 # Footer with links
│   │   ├── TrainCard.jsx              # Train display component
│   │   ├── SeatGrid.jsx               # Seat selection grid
│   │   ├── LoadingSpinner.jsx         # Loading indicator
│   │   ├── ErrorMessage.jsx           # Error display
│   │   └── ProtectedRoute.jsx         # Authentication wrapper
│   │
│   ├── pages/
│   │   ├── Home.jsx                   # Landing page (search)
│   │   ├── TrainList.jsx              # Search results page
│   │   ├── SeatSelection.jsx          # Seat booking page
│   │   ├── BookingConfirmation.jsx    # Booking summary page
│   │   ├── Login.jsx                  # Login page
│   │   ├── Register.jsx               # Registration page
│   │   ├── MyBookings.jsx             # User bookings history
│   │   └── Bookings.jsx              # (Legacy - can be removed)
│   │
│   ├── context/
│   │   ├── AuthContext.jsx            # Auth state management
│   │   └── TrainContext.jsx           # Train state management
│   │
│   ├── services/
│   │   └── api.js                     # Axios + API endpoints
│   │
│   ├── utils/
│   │   ├── formatters.js              # Data formatting functions
│   │   └── validation.js              # Form validation functions
│   │
│   ├── App.jsx                        # Main app with routing
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Tailwind CSS setup
│
├── public/
│   └── favicon.ico                    # App icon
│
├── index.html                         # HTML template
├── package.json                       # Project dependencies
├── package-lock.json                  # Lock file (auto-generated)
├── tailwind.config.js                 # Tailwind configuration
├── postcss.config.js                  # PostCSS configuration
├── vite.config.js                     # Vite configuration
├── QUICK_START.md                     # Quick start guide
├── README_FRONTEND.md                 # Full documentation
└── SETUP_GUIDE.md                     # This file

```

### Key Files Explanation

#### `src/App.jsx`
- Main application component
- Defines all routes
- Wraps context providers in main.jsx
- Route definitions for all pages

#### `src/main.jsx`
- Entry point for React application
- Wraps app with providers:
  - BrowserRouter (for routing)
  - AuthProvider (for auth state)
  - TrainProvider (for train state)

#### `src/services/api.js`
- Axios instance configuration
- All API endpoints defined
- Request/response interceptors
- Token management for authentication

#### `src/context/AuthContext.jsx`
- User authentication state
- Login/Register/Logout functions
- Token persistence
- Auth initialization on app load

#### `src/context/TrainContext.jsx`
- Train search state
- Selected train tracking
- Train list management
- Search parameters storage

---

## Features Overview

### 1. Home Page

**Location**: `/`

**Features**:
- Beautiful hero section
- Train search form with validation
- Popular routes quick selection
- Feature highlights
- Fully responsive design

**Components Used**:
- Navbar (top navigation)
- Search form with error display
- Popular routes cards
- Info section with features

### 2. Train List

**Location**: `/trains`

**Features**:
- Display search results dynamically
- Sort options (Departure, Price, Duration)
- Train card component with key info
- Loading spinner during fetch
- Error handling with retry
- Responsive grid layout

**Station Codes for Testing**:
- BBS (Bhubaneswar)
- BNC (Bangalore)
- HWH (Howrah)
- MAS (Chennai)
- NDLS (New Delhi)

### 3. Seat Selection (Protected)

**Location**: `/seat-selection`

**Features**:
- Interactive seat grid (72 seats, 6x12 layout)
- Visual feedback for seat status
- Multi-seat selection
- Passenger details form
- Real-time price calculation
- Responsive design

**Seat Status**:
- Green: Available (clickable)
- Blue: Selected (highlighted)
- Gray: Booked (disabled)

### 4. Booking Confirmation (Protected)

**Location**: `/booking-confirmation`

**Features**:
- Booking reference number
- Complete booking details
- Passenger information
- Train details with route info
- Price breakdown with GST
- Print ticket functionality
- Download ticket option
- Important information section

### 5. My Bookings (Protected)

**Location**: `/my-bookings`

**Features**:
- List all user bookings
- Booking status indicators
- Quick action menu
- Detailed booking modal
- Cancel booking functionality
- Sort and filter options

### 6. Authentication Pages

#### Login (`/login`)
- Email and password fields
- Remember me option
- Form validation
- Demo credentials available
- Auto-redirect if logged in

#### Register (`/register`)
- Name, email, password fields
- Password confirmation matching
- Terms acceptance checkbox
- Form validation with feedback
- Auto-login after registration

---

## API Integration

### Base Configuration

```javascript
// api.js
const API_BASE_URL = 'http://localhost:5000/api'

// Axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Auto-add auth token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### API Endpoints

#### Trains Endpoints
```
GET  /api/trains/search
     ?source=BBS
     &destination=BNC
     &date=2024-02-20

GET  /api/trains/:id
GET  /api/trains
GET  /api/trains/:id/seats?date=2024-02-20
```

#### Booking Endpoints
```
POST   /api/bookings
GET    /api/bookings
GET    /api/bookings/:id
DELETE /api/bookings/:id
```

#### Auth Endpoints
```
POST /api/auth/login
POST /api/auth/register
```

### Error Handling

```javascript
// Automatic error handling
api.interceptors.response.use(
  response => response,
  error => {
    // 401: Redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    // Return user-friendly error
    return Promise.reject(error.response?.data || error.message)
  }
)
```

---

## Testing Guide

### Manual Testing Checklist

#### Authentication
- [ ] Register with new email
- [ ] Login with credentials
- [ ] Logout clears state
- [ ] Login persists after refresh
- [ ] Protected routes redirect to login

#### Train Search
- [ ] Search with valid parameters
- [ ] Show error with empty fields
- [ ] Show error when source = destination
- [ ] Load spinner appears during search
- [ ] Results display correctly

#### Seat Selection
- [ ] Click seat to select
- [ ] Click again to deselect
- [ ] Multiple seat selection works
- [ ] Booked seats are disabled
- [ ] Price updates with selection

#### Booking
- [ ] All passenger details required
- [ ] Email validation works
- [ ] Price breakdown shows correctly
- [ ] Reference number displays
- [ ] Can print/download ticket

#### Responsive Design
- [ ] Test on mobile (320px)
- [ ] Test on tablet (768px)
- [ ] Test on desktop (1024px+)
- [ ] All buttons clickable on mobile
- [ ] Text readable on all sizes

### Testing with Demo Credentials

```
Email: demo@example.com
Password: password123
```

### Test Train Routes

```
Source → Destination
BBS    → BNC
HWH    → MAS
NDLS   → BBS
```

---

## Deployment

### Build for Production

```bash
npm run build
```

Creates optimized `dist/` folder with:
- Minified JavaScript
- Optimized CSS
- Asset optimization
- Source maps (optional)

### Production Files

```
dist/
├── index.html          # Entry HTML
├── assets/
│   ├── index.[hash].js    # Bundled JavaScript
│   ├── index.[hash].css   # Bundled CSS
│   └── ...other assets
└── favicon.ico
```

### Deployment Options

#### Option 1: Vercel
```bash
npm install -g vercel
vercel
```

#### Option 2: Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

#### Option 3: GitHub Pages
1. Build: `npm run build`
2. Push to GitHub
3. Enable Pages in settings

#### Option 4: Traditional Server
1. Upload `dist/` folder to server
2. Configure web server for SPA
3. Point to index.html for 404s

### Environment Configuration

For production:
```env
VITE_API_URL=https://api.production-domain.com
VITE_APP_NAME=TrainBooking
```

---

## Troubleshooting

### Installation Issues

#### Problem: `npm install` fails

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Install again
npm install
```

#### Problem: Node version incompatible

**Solutions**:
```bash
# Check version
node --version

# Should be 16.0 or higher
# Update Node from: https://nodejs.org/
```

### Runtime Issues

#### Problem: Port 5173 already in use

**Solutions**:
```bash
# Windows:
netstat -ano | findstr :5173
taskkill /PID [PID] /F

# macOS/Linux:
lsof -i :5173
kill -9 [PID]

# Or change port in vite.config.js:
server: {
  port: 3000  // Use different port
}
```

#### Problem: Styles not loading

**Solutions**:
```bash
# Rebuild Tailwind
npm run dev

# Clear browser cache (Ctrl+Shift+Delete)
# Check network tab for CSS file
```

#### Problem: API calls failing

**Solutions**:
1. Verify backend is running: `http://localhost:5000`
2. Check browser console (F12 → Console)
3. Check network requests (F12 → Network)
4. Verify API URL in `src/services/api.js`

### Performance Issues

#### Problem: Slow initial load

**Solutions**:
```bash
# Check build size
npm run build
# Look at dist/ folder size

# Optimize images
# Lazy load routes
# Enable compression
```

#### Problem: React DevTools not showing

**Solutions**:
1. Install React Developer Tools extension
2. Restart browser
3. Check console for React initialization

---

## Development Workflow

### Start Development

```bash
npm run dev
```

### Make Changes

- Edit files in `src/`
- Changes auto-refresh in browser (HMR)
- Check console for errors

### Test Changes

1. Browser: Test UI/UX
2. Console: Check for errors/warnings
3. Network: Monitor API calls
4. Desktop/Mobile: Test responsiveness

### Build for Production

```bash
npm run build
npm run preview  # Test production build
```

### Commit Changes

```bash
git add .
git commit -m "Description of changes"
git push
```

---

## Important Notes

1. **Authentication**: Currently uses localStorage + mock API
   - For real authentication, integrate with backend JWT
   - Token refresh logic should be added
   - Logout on token expiration

2. **API Responses**: Handle various response formats
   - Some endpoints may return different structures
   - Always validate response data
   - Add proper error boundaries

3. **Performance**:
   - Lazy load components for large apps
   - Optimize images (300KB max per image)
   - Use React.memo for expensive components
   - Minimize bundle size

4. **Security**:
   - Never store sensitive data in localStorage
   - Use httpOnly cookies for tokens (requires backend change)
   - Validate all user inputs
   - Sanitize data before display

5. **Browser Compatibility**:
   - Test on latest browsers
   - Use CSS fallbacks for older browsers
   - Test touch interactions on mobile
   - Test with screen readers for accessibility

---

## Next Steps

1. **Complete Installation**: Follow Installation & Setup section above
2. **Start Development Server**: Run `npm run dev`
3. **Test with Demo Credentials**: Use provided credentials
4. **Explore Features**: Navigate through all pages
5. **Review Code**: Understand component structure
6. **Customize**: Modify styles, add features
7. **Deploy**: Build and deploy to production

---

## Getting Help

### Documentation Files
- `QUICK_START.md` - Quick start guide
- `README_FRONTEND.md` - Full documentation
- `SETUP_GUIDE.md` - This file

### Useful Links
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)

### Debug Tools
- React DevTools Extension
- Browser Network Tab (F12)
- Browser Console (F12 → Console)
- VS Code Debugger

---

## Success Checklist

- [ ] Node.js 16+ installed
- [ ] npm dependencies installed (`npm install`)
- [ ] Backend running on localhost:5000
- [ ] Frontend running on localhost:5173
- [ ] Can navigate to home page
- [ ] Can search for trains
- [ ] Can login/register
- [ ] Can select seats
- [ ] Can view bookings
- [ ] No console errors

---

**You're all set! Happy coding! 🚀**

For any issues, refer to the troubleshooting section or check the console for detailed error messages.
