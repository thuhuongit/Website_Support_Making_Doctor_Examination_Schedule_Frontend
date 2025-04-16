// src/axios.js
import axios from 'axios';

// Cấu hình base URL cho tất cả các request
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Thay đổi với base URL của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Thêm interceptor nếu cần (ví dụ: token Authorization)
axiosInstance.interceptors.request.use(
  (config) => {
    
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi nếu cần (ví dụ: logout khi token hết hạn)
    if (error.response && error.response.status === 401) {
      // Logic xử lý khi token hết hạn hoặc không hợp lệ
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
