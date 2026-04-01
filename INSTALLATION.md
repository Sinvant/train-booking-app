# 🚂 Train Reservation System - Frontend Installation

## ⚡ Quick Installation (3 Steps)

### Step 1: Installing Dependencies
```bash
cd d:\TRS
npm install
```
⏱️ Takes 2-3 minutes

### Step 2: Start Development Server
```bash
npm run dev
```
Wait for:
```
  ➜  Local:   http://localhost:5173/
```

### Step 3: Open in Browser
Click the link or visit:
```
http://localhost:5173
```

---

## 🔑 Demo Login Credentials

```
✉️  Email:    demo@example.com
🔑 Password: password123
```

---

## 📱 What You Get

| Feature | Status |
|---------|--------|
| 🔍 Train Search | ✅ Complete |
| 📋 Train List | ✅ Complete |
| 💺 Seat Selection | ✅ Complete |
| ✏️ Booking Confirmation | ✅ Complete |
| 📚 My Bookings | ✅ Complete |
| 🔐 Authentication | ✅ Complete |
| 📱 Mobile Responsive | ✅ Complete |
| 🎨 Modern UI/UX | ✅ Complete |

---

## 🗺️ Pages Available

| Page | URL | Protected |
|------|-----|-----------|
| Home | `/` | ❌ No |
| Search Results | `/trains` | ❌ No |
| Seat Selection | `/seat-selection` | ✅ Yes |
| Booking Confirmation | `/booking-confirmation` | ✅ Yes |
| My Bookings | `/my-bookings` | ✅ Yes |
| Login | `/login` | ❌ No |
| Register | `/register` | ❌ No |

---

## 🧪 Test Station Codes

Use these for testing train search:

| From | To | Route |
|------|----|----|
| BBS | BNC | Bhubaneswar → Bangalore |
| HWH | MAS | Howrah → Chennai |
| NDLS | BBS | New Delhi → Bhubaneswar |

---

## 🛠️ Troubleshooting

### Problem: Port already in use
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID] /F

# Or reboot
```

### Problem: Dependencies issue
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problem: Styles not showing
```bash
# Close dev server
Ctrl + C

# Start again
npm run dev
```

### Problem: API not connecting
```
1. Check backend is running on http://localhost:5000
2. Open browser dev tools (F12)
3. Check Network tab for API calls
4. Verify API URL in src/services/api.js
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `QUICK_START.md` | Fast 5-minute setup |
| `SETUP_GUIDE.md` | Detailed configuration |
| `README_FRONTEND.md` | Complete feature docs |
| `IMPLEMENTATION_SUMMARY.md` | What was created |

---

## 🎯 Next Steps

1. ✅ Install: `npm install`
2. ✅ Start: `npm run dev`
3. ✅ Browse: `http://localhost:5173`
4. ✅ Login: Use demo credentials
5. ✅ Explore: Test all features
6. 🔧 Customize: Modify as needed
7. 🚀 Deploy: `npm run build`

---

## 📦 What's Included

✅ Complete React Frontend
✅ Modern Tailwind CSS Styling
✅ React Router Navigation
✅ Context API State Management
✅ Axios API Integration
✅ Form Validation
✅ Error Handling
✅ Loading States
✅ Responsive UI
✅ Authentication Flow
✅ Protected Routes
✅ Comprehensive Documentation

---

## 🎨 Tech Stack

```
Frontend: React 18.2
Styling: Tailwind CSS 3.3
Routing: React Router 6.14
API: Axios 1.4
Icons: Lucide React
Build: Vite 5.1
State: Context API
```

---

## ✨ Features

### Authentication
- Register with validation
- Login with credentials
- Protected routes
- Auto token refresh
- Logout functionality

### Train Management
- Search trains
- Filter by date
- Sort results
- View details
- Interactive UI

### Booking System
- Select multiple seats
- Enter passenger info
- Price calculation
- Confirmation page
- Download tickets

### User Bookings
- View all bookings
- Check status
- See details
- Cancel bookings
- Print tickets

---

## 🚀 Commands Reference

```bash
# Install dependencies
npm install

# Start dev server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ⚙️ System Requirements

| Requirement | Minimum |
|-------------|---------|
| Node.js | 16+ |
| npm | 7+ |
| RAM | 2GB |
| Disk Space | 1GB |
| Backend API | Running |

---

## 📞 Quick Support

### Can't connect to backend?
- Is backend running? `http://localhost:5000`
- Check API URL in `src/services/api.js`
- Check browser Network tab (F12)

### Styles not working?
- Restart dev server
- Check Tailwind config: `tailwind.config.js`
- Clear browser cache (Ctrl+Shift+Del)

### Page not loading?
- Check browser console (F12 → Console)
- Verify routing in `src/App.jsx`
- Check network requests

### Need help?
- Read documentation files
- Check code comments
- Inspect browser console errors
- Review network requests

---

## 🎉 You're Ready!

Run these commands now:
```bash
cd d:\TRS
npm install
npm run dev
```

**Your Train Reservation System is launching!** 🚂

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**

Questions? Check the documentation files or review the code comments!
