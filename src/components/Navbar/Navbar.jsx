import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { useTranslation } from "react-i18next";
import "../../i18n";
import Banner from '../Banner/Banner';
import SpecialtiesSlider from '../SpecialtiesSlider/SpecialtiesSlider'

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState("vi"); // Mặc định là tiếng Việt

  // Hàm đổi ngôn ngữ
  const changeLanguage = (lng) => {
    console.log("Chuyển ngôn ngữ sang:", lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); 
    setActiveLang(lng); // Cập nhật trạng thái nút được chọn
  };

  // Khi component mount, kiểm tra localStorage để load ngôn ngữ đã lưu
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "vi";
    i18n.changeLanguage(savedLanguage);
    setActiveLang(savedLanguage); // Đảm bảo nút hiển thị đúng màu khi tải trang
  }, []);

  return (
    <div className="header-container">
      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <i className="fa-solid fa-bars"></i>
          <img src="/logo.png" alt="BookingCare" />
          <span className="logo-text">BookingCare</span>
        </div>

        {/* Menu giữa */}
        <ul className="nav-links">
          <li>{t("Chuyên khoa")}<br /><span>{t("Tìm bác sĩ theo chuyên khoa")}</span></li>
          <li>{t("Cơ sở y tế")}<br /><span>{t("Chọn bệnh viện phòng khám")}</span></li>
          <li>{t("Bác sĩ")}<br /><span>{t("Chọn bác sĩ giỏi")}</span></li>
          <li>{t("Gói khám")}<br /><span>{t("Khám sức khỏe tổng quát")}</span></li>
        </ul>

        {/* Phần bên phải: Hỗ trợ + Đổi ngôn ngữ */}
        <div className="navbar-right">
          {/* Nút hỗ trợ */}
          <div className="navbar-support">
            <button>
              <i className="fa-solid fa-phone-volume"></i> {t("Hỗ trợ")}
            </button>
          </div>

          {/* Chuyển đổi ngôn ngữ */}
          <div className="language-switch">
            <button 
              className={activeLang === "vi" ? "active-lang" : ""} 
              onClick={() => changeLanguage("vi")}
            >
              🇻🇳
            </button>
            <button 
              className={activeLang === "en" ? "active-lang" : ""} 
              onClick={() => changeLanguage("en")}
            >
              🇺🇸
            </button>
          </div>
        </div>

      </nav>
      <Banner />
      <SpecialtiesSlider />
    </div>
  );
};

export default Navbar;
