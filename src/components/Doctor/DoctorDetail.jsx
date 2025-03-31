import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./DoctorDetail.css";
import Footer from "../Footer/Footer";

const DoctorDetail = () => {
  const { id } = useParams();
  const [selectedTime, setSelectedTime] = useState(null);

  const doctorData = {
    "nguyen-ngoc-thanh": {
      name: "Bác sĩ Chuyên khoa I Nguyễn Ngọc Thành",
      experience: "Gần 20 năm kinh nghiệm khám và điều trị về Suy giãn tĩnh mạch",
      location: "Hà Nội",
      schedule: [
        "09:30 - 10:00", "10:00 - 10:30", "10:30 - 11:00",
        "11:00 - 11:30", "11:30 - 12:00", "13:30 - 14:00",
        "14:00 - 14:30", "14:30 - 15:00", "15:00 - 15:30",
        "16:00 - 16:30", "16:30 - 17:00"
      ],
    },
  };

  const doctor = doctorData[id] || doctorData["nguyen-ngoc-thanh"];

  return (
    
    <div className="doctor-container">

      <div className="doctor-info">
        <img src="/doctor.png" alt="Bác sĩ" className="doctor-image" />
        <div>
          <h2 className="doctor-name">{doctor.name}</h2>
          <p className="doctor-experience">{doctor.experience}</p>
          <p className="doctor-location"><strong>Địa điểm:</strong> {doctor.location}</p>
        </div>
      </div>
      <h3 className="schedule-title">LỊCH KHÁM</h3>
      <div className="schedule-grid">
        {doctor.schedule.map((time, index) => (
          <button
            key={index}
            className={`schedule-button ${selectedTime === time ? "selected" : ""}`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>
      {selectedTime && (
        <p className="selected-time">Bạn đã chọn: {selectedTime}</p>
      )}



<Footer/>
    </div>
  );
};

export default DoctorDetail;
