// src/axios.js
import axios from 'axios';
import router from '@/router';

const api = axios.create({
  baseURL: 'https://api.yourdomain.com/v1',
  headers: { 'Content-Type': 'application/json' },
});

// Attach token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized or missing token
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
