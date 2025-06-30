import React, { useState, useEffect } from "react";
import "./Banner.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

    // Danh sách placeholder
  const placeholders = [
    t("Tìm chuyên khoa"),
    t("Tìm bác sĩ"),
    t("Tìm cơ sở y tế"),
  ];

  const [index, setIndex] = useState(0); // sử dụng setIndex
  const [isFocused, setIsFocused] = useState(false); 

  // Đổi placeholder mỗi 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % placeholders.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [placeholders.length]);

  
  const handleClick = () => {
  console.log("Clicked");
  navigate("/search");
};


  return (
    <div className="banner">
      <div className="overlay">
        <div className="title1"><h1>{t("NỀN TẢNG Y TẾ")}</h1></div>
        <div className="title2"><h2>{t("CHĂM SÓC SỨC KHỎE TOÀN DIỆN")}</h2></div>
  
        <div className="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder={placeholders[index]} readOnly onClick={handleClick} />
          </div>
        </div>
        <div className="service-section">
          <div className="service-item">
            <i className="fa-solid fa-stethoscope"></i>
            <p>{t("Khám chuyên khoa")}</p>
          </div>
          <div className="service-item">
            <i className="fa-solid fa-hospital"></i>
            <p>{t("Khám từ xa")}</p>
          </div>
          <div className="service-item">
            <i className="fa-solid fa-notes-medical"></i>
            <p>{t("Khám tổng quát")}</p>
          </div>
          <div className="service-item">
            <i className="fa-solid fa-vials"></i>
            <p>{t("Xét nghiệm y học")}</p>
          </div>
          <div className="service-item">
            <i className="fa-solid fa-brain"></i>
            <p>{t("Sức khỏe tinh thần")}</p>
          </div>
          <div className="service-item">
            <i className="fa-solid fa-heartbeat"></i>
            <p>{t("Khám nha khoa")}</p>
          </div>
        </div>
      </div>
  );
};

export default Banner;

