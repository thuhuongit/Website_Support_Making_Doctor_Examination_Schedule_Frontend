// src/axios.js
import axios from 'axios';

// Cấu hình base URL cho tất cả các request
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api', // Thay đổi với base URL của bạn
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
const getScheduleByDate = async (doctorId, selectedDate) => {
  try {
    const response = await axios.get(`http://localhost:8081/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${selectedDate}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule:', error);
  }
};

// Gửi yêu cầu đặt lịch hẹn
const bookAppointment = async (appointmentData) => {
  try {
    const response = await axios.post('http://localhost:8081/api/patient-book-appointment', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
  }
};

// Lấy danh sách bệnh nhân của bác sĩ
const getListPatientForDoctor = async (doctorId) => {
  try {
    const response = await axios.get(`http://localhost:8081/api/get-list-patient-for-doctor`);
    return response.data;
  } catch (error) {
    console.error('Error fetching patient list:', error);
  }
};

// Gửi thông tin điều trị hoặc thuốc cho bệnh nhân
const sendRemedy = async (remedyData) => {
  try {
    const response = await axios.post('/api/send-remedy', remedyData);
    return response.data;
  } catch (error) {
    console.error('Error sending remedy:', error);
  }
};

// Hủy lịch hẹn
const cancelBooking = async (appointmentId) => {
  try {
    const response = await axios.post('http://localhost:8081/api/cancel-booking', { appointmentId });
    return response.data;
  } catch (error) {
    console.error('Error canceling booking:', error);
  }
};

export default axiosInstance;
