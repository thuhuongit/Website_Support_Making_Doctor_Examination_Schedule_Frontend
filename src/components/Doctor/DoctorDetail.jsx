import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DoctorDetail.css";
import Footer from "../Footer/Footer";
import BookingModal from "./BookingModal";

const timeSlots = [
  "8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"
];

function DoctorSchedule() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const handleTimeClick = (slot) => {
      setSelectedTime(slot);
      setShowModal(true);
    };
  const t = (text) => text; // Tạm thời nếu chưa dùng đa ngôn ngữ

  return (
    <div className="doctor-schedule">

      {/* Navbar */}
      <nav className="navbar">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
          
          <img className="logo-img" src="/logo.png" alt="BookingCare"/>
          <span className="logo-text">BookingCare</span>
        </div>

        {/* Menu giữa */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>{t("Chuyên khoa")}<br /><span>{t("Tìm bác sĩ theo chuyên khoa")}</span></li>
          <li>{t("Cơ sở y tế")}<br /><span>{t("Chọn bệnh viện phòng khám")}</span></li>
          <li>{t("Bác sĩ")}<br /><span>{t("Chọn bác sĩ giỏi")}</span></li>
          <li>{t("Gói khám")}<br /><span>{t("Khám sức khỏe tổng quát")}</span></li>
        </ul>

        {/* Bên phải */}
        <div className="navbar-right">
          <div className="navbar-support">
            <button>
              <i className="fa-solid fa-phone-volume"></i> {t("Hỗ trợ")}
            </button>
          </div>
          <div className="language-switch">
            <button className="active-lang">🇻🇳</button>
            <button>🇺🇸</button>
          </div>
        </div>
      </nav>

      {/* Header thông tin bác sĩ */}
      <div className="header">
        <img src="/2.png" alt="Doctor" />
        <div className="info">
          <h2>Tiến sĩ, Huỳnh Quốc Cường</h2>
          <p>
            Bác sĩ đầu ngành chuyên khoa Tâm thần, Bệnh viện Bạch Mai. Nguyên Viện trưởng Viện Sức khỏe Tâm thần quốc gia.
          </p>
          <p className="note">
            Lưu ý: Bác sĩ chỉ nhận tư vấn từ xa trong giai đoạn dịch COVID-19.
          </p>
        </div>
      </div>

      {/* Lịch khám */}
      <div className="schedule-section">
        <h3>Hôm nay - 20/11</h3>
        <div className="slots">
          {timeSlots.map((slot, index) => (
            <button className="slot-button" key={index} onClick={() => handleTimeClick(slot)}>{slot}</button>
          ))}
        </div>
        <div className="note">Chọn giờ và đặt (miễn phí)</div>
      </div>
      {/* Hiển thị modal nếu có chọn giờ */}
      {showModal && (
        <BookingModal
          time={selectedTime}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Thông tin chi tiết */}
      <div className="details">
        <h4>1. Tiến sĩ, Huỳnh Quốc Cường</h4>
        <ul>
          <li>Danh hiệu Thầy thuốc Nhân dân</li>
          <li>Bác sĩ đầu ngành chuyên khoa Tâm thần</li>
          <li>Nguyên Viện trưởng Viện Sức khỏe Tâm thần quốc gia, Bệnh viện Bạch Mai</li>
        </ul>

        <h4>2. Quá trình công tác</h4>
        <ul>
          <li>PGS.TS Bác sĩ chuyên khoa tại Bệnh viện Bạch Mai</li>
          <li>Chủ trì các đề tài nghiên cứu, giảng dạy tại Đại học Y Hà Nội</li>
        </ul>
      </div>
      <Footer/>
    </div>
  );
}

export default DoctorSchedule;
