import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Specialty.css';
import Footer from '../Footer/Footer';

const doctors = [
  {
    id: 1,
    name: 'PGS. TS. BSCKII. TTUT Vũ Văn Hòa',
    description: 'Bác sĩ có 35 năm kinh nghiệm về Cột sống, thần kinh, cơ xương khớp',
    role: 'Phó chủ tịch hội Phẫu thuật cột sống Việt Nam',
    location: 'Hà Nội',
    address: 'Phòng khám Spinetech Clinic, 257 Giải Phóng, Đống Đa, Hà Nội',
    price: '500.000đ',
    availableTimes: ['13:30 - 14:00', '14:00 - 14:30', '14:30 - 15:00', '15:00 - 15:30', '15:30 - 16:00'],
    image: './7.jpg',
    favorite: true
  },
  {
    id: 2,
    name: 'ThS.BS Nguyễn Trần Trung',
    description: 'Bác sĩ có nhiều năm kinh nghiệm trong khám và điều trị Cơ xương khớp',
    role: 'Phó trưởng khoa Cơ Xương Khớp Bệnh viện E',
    location: 'Hà Nội',
    address: 'Bệnh viện E Trung Ương, 89 Trần Cung, Cầu Giấy, Hà Nội',
    price: '400.000đ',
    availableTimes: [],
    image: 'https://via.placeholder.com/80x80',
    favorite: true
  }
];

const Specialty = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="specialty-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          <img className="logo-img" src="/logo.png" alt="BookingCare" />
          <span className="logo-text">BookingCare</span>
        </div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>{t("Chuyên khoa")}<br /><span>{t("Tìm bác sĩ theo chuyên khoa")}</span></li>
          <li>{t("Cơ sở y tế")}<br /><span>{t("Chọn bệnh viện phòng khám")}</span></li>
          <li>{t("Bác sĩ")}<br /><span>{t("Chọn bác sĩ giỏi")}</span></li>
          <li>{t("Gói khám")}<br /><span>{t("Khám sức khỏe tổng quát")}</span></li>
        </ul>
        <div className="navbar-right">
          <div className="navbar-support">
            <button><i className="fa-solid fa-phone-volume"></i> {t("Hỗ trợ")}</button>
          </div>
          <div className="language-switch">
            <button className="active-lang">🇻🇳</button>
            <button>🇺🇸</button>
          </div>
        </div>
      </nav>

      <h2 className="title">Cơ Xương Khớp</h2>
      <p className="sub-title">Bác sĩ Cơ Xương Khớp giỏi</p>
      <ul className="description-list">
        <li>Chuyên gia đào tạo bài bản, nhiều kinh nghiệm</li>
        <li>Giảng viên Đại học Y khoa</li>
        <li>Công tác tại các bệnh viện lớn</li>
      </ul>

      {doctors.map((doc) => (
        <div className="doctor-card" key={doc.id}>
          <div className="left">
            <img src={doc.image} alt="Doctor" className="avatar" />
            <div className="info">
              <p className="name">
                {doc.favorite && <span className="favorite">💛 Yêu thích</span>}{' '}
                <span className="name-text">{doc.name}</span>
              </p>
              <p className="description">{doc.description}</p>
              <p className="role">{doc.role}</p>
              <p className="location"> <i class="fa-solid fa-location-dot"></i> {doc.location}</p>
            </div>
          </div>

          <div className="right">
            <div className="date">Hôm nay - 22/5 ⌄</div>
            <div className="schedule">
              {doc.availableTimes.length > 0 ? (
                doc.availableTimes.map((time, idx) => (
                  <button className="time-slot" key={idx}>{time}</button>
                ))
              ) : (
                <p className="no-schedule">Không có lịch hôm nay</p>
              )}
            </div>
            <p className="note">Chọn và đặt (Phí đặt lịch 0đ)</p>
            <div className="clinic">
              <p><strong>ĐỊA CHỈ KHÁM</strong></p>
              <p className="clinic-name">{doc.address}</p>
            </div>
            <div className="price">
              <strong>GIÁ KHÁM:</strong> {doc.price} <a href="#">Xem chi tiết</a>
            </div>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default Specialty;
