import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

// Request interceptor එකක් add කරලා token එක request එකට attach කරන්න
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('expense-tracker-token'); // localStorage එකෙන් token එක ගන්න
    if (token) {
      config.headers.Authorization = ` ${token}`; // Authorization header එකට token එක set කරන්න
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor එක
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {

      if (!window.location.pathname.includes("/login") && !window.location.pathname.includes("/register")) {
        alert("Session expired. Please log in again to continue.");
        localStorage.removeItem('expense-tracker-token');
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);


export default instance;
