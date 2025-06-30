import React, { useEffect, useState, useRef } from "react";
import './Navbar.css';
import { useTranslation } from "react-i18next";
import "../../i18n";
import TopBar from '../TopBar/TopBar';
import Banner from '../Banner/Banner';
import SpecialtiesSlider from '../SpecialtiesSlider/SpecialtiesSlider'
import Media from '../Media/Media';
import Footer from '../Footer/Footer';
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [activeLang, setActiveLang] = useState("vi"); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const [highlighted, setHighlighted] = useState(null);
  const [user, setUser] = useState(null);

    // Tạo ref cho phần "Chuyên khoa phổ biến"
    const specialtiesRef = useRef(null);
    const hospitalsRef = useRef(null);
    const doctorsRef = useRef(null);
    const packagesRef = useRef(null);

      // Hàm cuộn xuống khi nhấn vào menu "Chuyên khoa"
      const scrollToSection = (ref) => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: "smooth" });
      
          setHighlighted(ref); 
          setTimeout(() => {
            setHighlighted(null); 
          }, 1500);
        }
      };
      
      

  // Hàm đổi ngôn ngữ
  const changeLanguage = (lng) => {
    console.log("Chuyển ngôn ngữ sang:", lng);
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); 
    setActiveLang(lng); 
  };

  // Khi component mount, kiểm tra localStorage để load ngôn ngữ đã lưu
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "vi";
    i18n.changeLanguage(savedLanguage);
    setActiveLang(savedLanguage);
  }, []);

  useEffect(() => {
  const savedLanguage = localStorage.getItem("language") || "vi";
  i18n.changeLanguage(savedLanguage);
  setActiveLang(savedLanguage);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setUser(storedUser);
  }
}, []);


  return (
    <div className="header-container">
       <TopBar/>
      <div class="ai-assistant" onClick={() => navigate("/chat")} style={{ cursor: "pointer" }} >
          <img src="/chatbot.png" alt="Trợ lý AI" />
          <span>Trợ lý AI</span>
      </div>

      <nav className="navbar">
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>
        <button 
            className="menu-btn" 
            onClick={() => setMenuOpen(!menuOpen)}
            
          > <i className="fa-solid fa-bars"></i>

          </button>
          <img className="logo-img" src="/logo.png" alt="BookingCare" style={{width: '50px'}}/>
          <span className="logo-text">BookingCare</span>
        </div>

        {/* Menu giữa */}
        <ul className="nav-links">
          <li onClick={() => scrollToSection(specialtiesRef)}>{t("Chuyên khoa")}<br /><span>{t("Tìm bác sĩ theo chuyên khoa")}</span></li>
          <li onClick={() => scrollToSection(hospitalsRef)}>{t("Cơ sở y tế")}<br /><span>{t("Chọn bệnh viện phòng khám")}</span></li>
          <li onClick={() => scrollToSection(doctorsRef)} >{t("Bác sĩ")}<br /><span>{t("Chọn bác sĩ giỏi")}</span></li>
          <li onClick={() => scrollToSection(packagesRef)}>{t("Gói khám")}<br /><span>{t("Khám sức khỏe tổng quát")}</span></li>
        </ul>

        {/* Phần bên phải: Hỗ trợ + Đổi ngôn ngữ */}
        <div className="navbar-right">

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
       
       {/* Menu dropdown */}
       <div className={`dropdown-menu ${menuOpen ? 'show' : ''}`}>
        <ul>
          <li onClick={() => navigate("/")}><a href="#">Trang chủ</a></li>
          <li><a href="#">Cẩm nang</a></li>
          <li><a href="#">Liên hệ hợp tác</a></li>
          <li><a href="#">Sức khỏe doanh nghiệp</a></li>
          <li><a href="#">Chuyển đổi số Phòng khám</a></li>
          <li><a href="#">Tuyển dụng</a></li>
          <li><a href="#">Dành cho bệnh nhân</a></li>
          <li><a href="#">Dành cho bác sĩ</a></li>
          <li><a href="#">Vai trò của BookingCare</a></li>
          <li><a href="#">Liên hệ</a></li>
          <li><a href="#">Câu hỏi thường gặp</a></li>
          <li><a href="#">Điều khoản sử dụng</a></li>
        </ul>
      </div>
      </nav>

      <Banner />
        {/* Chuyên khoa phổ biến */}
<div ref={specialtiesRef} className={`specialties-section ${highlighted === specialtiesRef ? "highlight" : ""}`}>
  <SpecialtiesSlider type="specialties" />
</div>

{/* Cơ sở y tế */}
<div ref={hospitalsRef} className={`specialties-section ${highlighted === specialtiesRef ? "highlight" : ""}`}>
  <SpecialtiesSlider type="hospitals" />
</div>

{/* Bác sĩ nổi bật */}
<div ref={doctorsRef} className={`specialties-section ${highlighted === specialtiesRef ? "highlight" : ""}`}>
  <SpecialtiesSlider type="doctors" />
</div>

{/* Gói khám */}
<div ref={packagesRef} className={`specialties-section ${highlighted === specialtiesRef ? "highlight" : ""}`}>
  <SpecialtiesSlider type="healPackage" />
</div>

      <Media/>
      <Footer/>
    
    </div>
  );
};

export default Navbar;
