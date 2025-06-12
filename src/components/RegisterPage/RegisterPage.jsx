import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import axiosInstance from "../../util/axios";
import { Link, useNavigate } from "react-router-dom";
import './RegisterPage.css';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("http://localhost:8084/api/create-new-user", formData);
      if (response.data && response.data.errCode === 0) {
        navigate('/login');
      } else {
        alert(response.data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi đăng ký:", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại.");
    }
  };

  return (
    <div className="register-container">
      <nav className="navbar">
        <div className="logo" onClick={() => window.location.href = "/"}>
          <img className="logo-img" src="/logo.png" alt="BookingCare" style={{ width: '50px' }} />
          <span className="logo-text">BookingCare</span>
        </div>
        <div className="navbar-right">
          <div className='hotline'><i className="fa-solid fa-phone-volume"></i> Hotline: 024-7301-2468</div>
          <div className='email'><i className="fa-solid fa-envelope"></i> Email: support@bookingcare.vn</div>
          <div className="language-switch">
            <button className="active-lang">🇻🇳</button>
            <button>🇺🇸</button>
          </div>
        </div>
      </nav>

      <div className="register-left">
        <h1>BOOKING CARE</h1>
        <div className="announcement">
          <span>CHÍNH THỨC RA MẮT</span>
          <h2 className="styled-heading">ĐẶT LỊCH KHÁM BỆNH ONLINE</h2>
          <p>HỎI NHANH, ĐÁP CHUẨN - ĐẶT KHÁM DỄ DÀNG</p>
        </div>
      </div>

      <div className="register-right">
        <h1 style={{ textAlign: "center" }}>ĐĂNG KÝ TÀI KHOẢN</h1>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email *" required value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password *" required value={formData.password} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
          
          {/* Khung chọn giới tính */}
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">-- Chọn giới tính --</option>
            <option value="0">Nam</option>
            <option value="1">Nữ</option>
            <option value="2">Khác</option>
          </select>

          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <button type="submit">ĐĂNG KÝ NGAY</button>
        </form>

        <p className="terms">
          Bằng việc nhấn nút ĐĂNG KÝ NGAY, bạn đã đồng ý với
          <a href="#"> điều khoản sử dụng dịch vụ </a>
          và
          <a href="#"> chính sách bảo mật </a> của chúng tôi.
        </p>
        <p style={{ textAlign: "center" }}>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
