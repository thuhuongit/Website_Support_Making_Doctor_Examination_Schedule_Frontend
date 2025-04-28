import "./ManageDoctor.css";
import { useState } from "react";

export default function Managedoctordoctor() {
  return (
    <div className="main-content">
      <h1 className="main-title">Tạo thêm thông tin bác sĩ</h1>

      <div className="form-wrapper">
       
        <div className="form-group">
          <label>Chọn bác sĩ</label>
          <select>
            <option>Nguyễn Thị Hồng</option>
            <option>Trần Văn A</option>
          </select>
        </div>

        
        <div className="form-grid">
          <div className="form-group">
            <label>Giá khám bệnh</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Phương thức thanh toán</label>
            <select>
              <option>The ATM</option>
              <option>Tiền mặt</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tỉnh thành</label>
            <select>
              <option>Đà Nẵng</option>
              <option>TP.HCM</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tên phòng khám</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Bác sĩ phòng khám</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Chuyên khoa</label>
            <select>
              <option>Bệnh viện Hồng Việt Đà Nẵng</option>
              <option>Bệnh viện Bạch Mai</option>
            </select>
          </div>
        </div>

        {/* Yêu cầu chi tiết */}
        <div className="form-group">
          <label>Yêu cầu chi tiết</label>
          <textarea rows="6" />
        </div>

        {/* Nút lưu */}
        <div className="form-actions">
          <button>Lưu thông tin</button>
        </div>
      </div>
    </div>
  );
}
