import React, { useState } from "react";
import "./DoctorDetail.css";
import axiosInstance from "../../util/axios";

function BookingModal({ time, onClose, doctorId, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    reason: '',
    gender: 'Nam',
    date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // In ra các thông tin người dùng nhập vào console
    console.log("Form Data Submitted: ", formData);  // Đoạn này sẽ in thông tin form ra console

    try {
      const response = await axiosInstance.post('/patient-book-appointment', {
        doctorId: doctorId,                     // ID bác sĩ
        timeType: time,               // Thời gian khám
        date: formData.date,          // Ngày khám
        fullName: formData.name,      // Họ tên bệnh nhân
        email: formData.email,        // Email bệnh nhân
        address: formData.address,    // Địa chỉ liên lạc
        selectedGender: formData.gender, // Giới tính
        reason: formData.reason,      // Lý do khám
      });

      console.log("Booking response:", response.data); 

      if (response.status === 200 && response.data.errCode === 0) {
        onSuccess(); // Callback để xử lý thông báo thành công
      } else {
        setError(response.data.errMessage || "Có lỗi xảy ra.");
      }
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Thông tin đặt lịch khám bệnh</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <p><strong>Tiến sĩ, Huỳnh Quốc Cường</strong></p>
          <p>{time} - 20/11/2024</p>
          <p>Miễn phí đặt lịch</p>

          <input type="text" placeholder="Họ và tên" name="name" value={formData.name} onChange={handleChange} />
          <input type="text" placeholder="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} />
          <input type="email" placeholder="Địa chỉ email" name="email" value={formData.email} onChange={handleChange} />
          <input type="text" placeholder="Địa chỉ liên lạc" name="address" value={formData.address} onChange={handleChange} />
          <input type="text" placeholder="Lý do khám" name="reason" value={formData.reason} onChange={handleChange} />
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-footer">
          <button 
            className="confirm-btn" 
            onClick={handleSubmit} 
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Xác nhận'}
          </button>
          <button className="cancel-btn" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
