import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../Footer/Footer";
import "./HospitalPage.css";
import axiosInstance from "../../util/axios"; 

const HospitalPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8084/api/get-clinic");
        console.log("Fetched hospitals:", res.data);
        if (res.data && res.data.errCode === 0) {
          setHospitals(res.data.data); // 
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []); // 

  return (
    <div className="hospitals-page">
      <nav className="navbar" style={{ marginTop: '0px'}}>
        <div className="logo" onClick={() => navigate("/")}>
          <img className="logo-img" src="/logo.png" alt="BookingCare" style={{width: '50px'}} />
          <span className="logo-text">BookingCare</span>
        </div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>{t("Chuyên khoa")}<br /><span>{t("Tìm bác sĩ theo chuyên khoa")}</span></li>
          <li>{t("Cơ sở y tế")}<br /><span>{t("Chọn bệnh viện phòng khám")}</span></li>
          <li>{t("Bác sĩ")}<br /><span>{t("Chọn bác sĩ giỏi")}</span></li>
          <li>{t("Gói khám")}<br /><span>{t("Khám sức khỏe tổng quát")}</span></li>
        </ul>
      </nav>

      <div className="hospitals-content">
        <h2>{t("Danh sách phòng khám")}</h2>
        <div className="hospitals-grid">
          {hospitals.map((item) => (
            <div
              key={item.id}
              className="hospitals-card"
              onClick={() => navigate(`/detail-hospitals/${item.id}`)}
            >
              <img
                src={`http://localhost:8084/${item.image}`} 
                alt={item.name}
              />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HospitalPage;
