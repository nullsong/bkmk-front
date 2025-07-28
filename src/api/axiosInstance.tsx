import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://bkmk-jl47.onrender.com/',
  // baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
})

axiosInstance.interceptors.response.use(res => res, err => {
  if (err.response?.status === 401 || err.response?.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  return Promise.reject(err);
})

export default axiosInstance;