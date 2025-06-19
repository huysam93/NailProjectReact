import axios from 'axios';

const apiClient = axios.create({
  //baseURL: 'http://localhost:5000/api', // Backend API port
  baseURL: 'https://nailprojectreact-1.onrender.com/api', // Backend API port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
