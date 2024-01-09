import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mezzprobackend.onrender.com/', // Replace with your backend URL
});

axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token'); // Assuming you store your token in local storage
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosInstance;