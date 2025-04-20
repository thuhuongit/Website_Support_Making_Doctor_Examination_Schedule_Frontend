import React from "react";
import "./DoctorDetail.css";

function BookingModal({ time, onClose }) {
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

          <input type="text" placeholder="Họ và tên" />
          <input type="text" placeholder="Số điện thoại" />
          <input type="email" placeholder="Địa chỉ email" />
          <input type="text" placeholder="Địa chỉ liên lạc" />
          <input type="text" placeholder="Lý do khám" />
          <input type="date" />
          <select>
            <option>Giới tính</option>
            <option>Nam</option>
            <option>Nữ</option>
          </select>
        </div>

        <div className="modal-footer">
          <button className="confirm-btn">Xác nhận</button>
          <button className="cancel-btn" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
}

export default BookingModal;
