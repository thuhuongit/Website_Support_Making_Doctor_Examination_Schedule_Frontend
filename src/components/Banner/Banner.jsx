import React from "react";
import "./Banner.css";
import { useTranslation } from "react-i18next";

const Banner = () => {
  const { t } = useTranslation();
  return (
    <div className="banner">
      <div className="overlay">
        <div className="title1"><h1>{t("NỀN TẢNG Y TẾ")}</h1></div>
        <div className="title2"><h2>{t("CHĂM SÓC SỨC KHỎE TOÀN DIỆN")}</h2></div>
  
        <div className="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder={t("Tìm lý do khám")} />
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

