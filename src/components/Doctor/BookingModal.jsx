import React, { useState } from "react";
import "./DoctorDetail.css";
import axiosInstance from "../../util/axios";

function BookingModal({ time, date, onClose, doctorId, onSuccess, doctorInfo }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    reason: '',
    gender: 'Nam',
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

    try {
      const response = await axiosInstance.post('http://localhost:8083/api/patient-book-appointment', {
        doctorId: doctorId,
        timeType: time,
        date: date,
        fullName: formData.name,
        email: formData.email,
        address: formData.address,
        selectedGender: formData.gender,
        reason: formData.reason,
      });

      if (response.status === 200 && response.data.errCode === 0) {
        onSuccess(); // thành công
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

  const formattedDate = date?.split("-").reverse().join("/");

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Thông tin đặt lịch khám bệnh</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {doctorInfo && (
            <>
              <p>
                <strong>
                  {doctorInfo.positionData?.valueVi} {doctorInfo.firstName} {doctorInfo.lastName}
                </strong>
              </p>
              <p><strong>{time}</strong> - <strong>{formattedDate}</strong></p>
              <p>Miễn phí đặt lịch</p>
            </>
          )}

          <input type="text" placeholder="Họ và tên" name="name" value={formData.name} onChange={handleChange} />
          <input type="text" placeholder="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} />
          <input type="email" placeholder="Địa chỉ email" name="email" value={formData.email} onChange={handleChange} />
          <input type="text" placeholder="Địa chỉ liên lạc" name="address" value={formData.address} onChange={handleChange} />
          <input type="text" placeholder="Lý do khám" name="reason" value={formData.reason} onChange={handleChange} />
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="modal-footer">
          <button className="confirm-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Xác nhận'}
          </button>
          <button className="cancel-btn" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
