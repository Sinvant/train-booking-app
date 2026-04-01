import axios from "axios";

/* =========================
   AXIOS BASE CONFIG
========================= */

// ✅ Only use Vercel env (NO localhost fallback)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ✅ Safety check
if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   REQUEST INTERCEPTOR
   Attach JWT Token
========================= */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
   Handle 401 errors
========================= */

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(
      error.response?.data?.message || error.message
    );
  }
);

/* =========================
   TRAIN API
========================= */

export const trainAPI = {
  // Get all trains
  getAllTrains: async () => {
    const response = await api.get("/trains");
    return response.data;
  },

  // Search trains
  searchTrains: async (source, destination) => {
    const response = await api.get("/trains/search", {
      params: { source, destination },
    });
    return response.data;
  },

  // Get train details
  getTrainDetails: async (trainId) => {
    const response = await api.get(`/trains/${trainId}`);
    return response.data;
  },
};

/* =========================
   AUTH API
========================= */

export const authAPI = {
  register: async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    // Save token automatically
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data));

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

/* =========================
   BOOKING API
========================= */

export const bookingAPI = {
  // Create booking
  createBooking: async (trainId, seats, date) => {
    const response = await api.post("/bookings", {
      trainId,
      seats,
      date,
    });
    return response.data;
  },

  // Get logged-in user's bookings
  getUserBookings: async () => {
    const response = await api.get("/bookings");
    return response.data;
  },

  cancelBooking: async (bookingId) => {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  },
};

export default api;
