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
