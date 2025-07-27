// utils/api.js
import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://your-production-api.com/api' // Replace with actual production API URL
    : 'http://localhost:4000/api';

const api = axios.create({
  baseURL,
  withCredentials: true, // if using cookies
});

export default api;
