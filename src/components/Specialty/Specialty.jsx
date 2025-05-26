import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // thêm useParams
import { useTranslation } from 'react-i18next';
import './Specialty.css';
import Footer from '../Footer/Footer';
import axiosInstance from "../../util/axios";

const Specialty = () => {
  const [detail, setDetail] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { id } = useParams();  // lấy id từ URL params
  const specialtyId = id;
  const location = "ALL";

  useEffect(() => {
    const fetchSpecialty = async () => {
      try {
        const res = await axiosInstance.get(`http://localhost:8083/api/get-detail-specialty-by-id`, {
          params: {
            id: specialtyId,
            location: location
          }
        });
        console.log('Detail data from API:', res.data.data);
        if (res.data.errCode === 0) {
          setDetail(res.data.data);
          if (res.data.data.doctors) {
            setDoctors(res.data.data.doctors);
          }
        }
      } catch (e) {
        console.error("Error fetching specialty detail:", e);
      }
    };

    if (specialtyId) {
      fetchSpecialty();
    }
  }, [specialtyId]);

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

      <div className="specialty-detail-box">
         <h2 className="title">{detail.name || "Tên chuyên khoa"}</h2>
         <p className="sub-title">{`Chuyên khoa ${detail.name || "chuyên khoa"}`}</p>

        {detail.descriptionHTML && (
         <div
            className="description-html"
            dangerouslySetInnerHTML={{ __html: detail.descriptionHTML }}
         />
     )}
    </div>


      {doctors.map((doc) => (
        <div className="doctor-card" key={doc.id}>
          {/* phần hiển thị bác sĩ như bạn đã viết */}
        </div>
      ))}

      <Footer />
    </div>
  );
};

export default Specialty;
