import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axios";
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
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      if (selectedDoctor && selectedDate) {
        try {
          const res = await axiosInstance.get("http://localhost:8082/api/get-schedule-doctor-by-date", {
            params: {
              doctorId: selectedDoctor,
              date: selectedDate,
            },
          });

          if (res.data.errCode === 0) {
            const serverTimes = res.data.data.map((item) => item.timeType);
            setAvailableTimes(serverTimes);
          } else {
            setAvailableTimes([]);
          }
        } catch (error) {
          console.error("Lỗi khi lấy lịch khám:", error);
          setAvailableTimes([]);
        }
      }
    };

    fetchSchedule();
  }, [selectedDoctor, selectedDate]);

  const handleTimeClick = (slot) => {
    if (availableTimes.includes(slot)) {
      setSelectedTime(slot);
      setShowModal(true);
    }
  };

  const handleBookingSuccess = () => {
    setShowModal(false);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  const t = (text) => text;

  return (
    <div className="doctor-schedule">
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

      <div className="header">
        <img src="/2.png" alt="Doctor" />
        <div className="info">
          <h2>Tiến sĩ, Huỳnh Quốc Cường</h2>
          <p>Bác sĩ đầu ngành chuyên khoa Tâm thần, Bệnh viện Bạch Mai. Nguyên Viện trưởng Viện Sức khỏe Tâm thần quốc gia.</p>
          <p className="note">Lưu ý: Bác sĩ có nhận tư vấn từ xa.</p>
        </div>
      </div>

      <div className="schedule-section">
        <label htmlFor="datePicker">Chọn ngày khám:</label>
        <input
          id="datePicker"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-picker"
        />

        <h3>Lịch khám theo ngày</h3>
        <div className="slots">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              className={`slot-button ${availableTimes.includes(slot) ? "available" : "unavailable"}`}
              onClick={() => handleTimeClick(slot)}
              disabled={!availableTimes.includes(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
        <div className="note">Chọn giờ và đặt (miễn phí)</div>
      </div>

      {showModal && (
        <BookingModal
          time={selectedTime}
          onClose={() => setShowModal(false)}
          onSuccess={handleBookingSuccess}
          doctorId={selectedDoctor}
          date={selectedDate}
        />
      )}

      {bookingSuccess && (
        <div className="booking-success-popup">
          <p>Bạn đã đặt lịch thành công - Vui lòng xác nhận email!</p>
        </div>
      )}

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

      <Footer />
    </div>
  );
}

export default DoctorSchedule;
