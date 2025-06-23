import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://nananail-u35x.onrender.com/api', // Backend API port. sử dụng để chạy local
   //baseURL: import.meta.env.VITE_API_URL, // Backend API port. sử dụng để deploy lên server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
