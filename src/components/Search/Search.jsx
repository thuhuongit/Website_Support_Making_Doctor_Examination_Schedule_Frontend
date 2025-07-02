import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../util/axios";
import "./Search.css";
import Footer from '../Footer/Footer';
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [specialties, setSpecialties] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const searchTypes = ["Tất cả", "Chuyên khoa", "Cơ sở y tế", "Bác sĩ"];



  useEffect(() => {
  const fetchData = async () => {
    try {
      const [specialtyRes, clinicRes, doctorRes] = await Promise.all([
        axiosInstance.get("http://localhost:8084/api/get-specialty"),
        axiosInstance.get("http://localhost:8084/api/get-clinic"),
        axiosInstance.get("http://localhost:8084/api/get-all-doctors"),
      ]);
      setSpecialties(specialtyRes.data?.data || []);
      setClinics(clinicRes.data?.data || []);
      const processedDoctors = (doctorRes.data?.data || []).map((doc) => {
        if (doc.image && typeof doc.image === "object" && doc.image.type === "Buffer") {
          const buffer = new Uint8Array(doc.image.data);
          doc.image = new TextDecoder().decode(buffer);  
        }
        return doc;
      });
      setDoctors(processedDoctors);
    } catch (err) {
      console.error("Error loading search data", err);
    }
  };
  fetchData();
}, []);

  // Hàm lọc kết quả
  const filterData = (data, key) =>
    data.filter((item) =>
      item[key]?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  const filteredSpecialties = filterData(specialties, "name");
  const filteredClinics = filterData(clinics, "name");
  const filteredDoctors = doctors.filter(
    (doc) =>
      `${doc.lastName} ${doc.firstName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-page">
      <nav className="navbar" style={{ marginTop: "0px" }}>
        <div className="logo" onClick={() => navigate("/")}>
          <img
            className="logo-img"
            src="/logo.png"
            alt="BookingCare"
            style={{ width: "50px" }}
          />
          <span className="logo-text">BookingCare</span>
        </div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            {t("Chuyên khoa")}
            <br />
            <span>{t("Tìm bác sĩ theo chuyên khoa")}</span>
          </li>
          <li>
            {t("Cơ sở y tế")}
            <br />
            <span>{t("Chọn bệnh viện phòng khám")}</span>
          </li>
          <li>
            {t("Bác sĩ")}
            <br />
            <span>{t("Chọn bác sĩ giỏi")}</span>
          </li>
          <li>
            {t("Gói khám")}
            <br />
            <span>{t("Khám sức khỏe tổng quát")}</span>
          </li>
        </ul>
      </nav>

      <div className="search-bar">
        <i className="fa fa-search search-icon"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Tìm ${searchType.toLowerCase()}`}
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          {searchTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="results-section">
        {/* Chuyên khoa */}
        {(searchType === "Tất cả" || searchType === "Chuyên khoa") && (
          <div className="result-group">
            <h4>Chuyên khoa</h4>
            {filteredSpecialties.map((item) => (
              <div key={item.id} className="result-item">
                <img
                   src={`http://localhost:8084/${item.image}`} 
                   alt={item.name}
                   style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "10px",
                        objectFit: "contain",
                }}
                />
                {item.name}
              </div>
            ))}
          </div>
        )}

        {/* Cơ sở y tế */}
        {(searchType === "Tất cả" || searchType === "Cơ sở y tế") && (
          <div className="result-group">
            <h4>Cơ sở y tế</h4>
            {filteredClinics.map((item) => (
              <div key={item.id} className="result-item">
                <img
                   src={`http://localhost:8084/${item.image}`} 
                   alt={item.name}
                   style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "10px",
                        objectFit: "contain",
                }}
                />
                {item.name}
              </div>
            ))}
          </div>
        )}

        {/* Bác sĩ */}
        {(searchType === "Tất cả" || searchType === "Bác sĩ") && (
          <div className="result-group">
            <h4>Bác sĩ</h4>
            {filteredDoctors.map((item) => (
              <div key={item.id} className="result-item">
                <img
                   src={`http://localhost:8084${item.image}`}
                   alt={`${item.lastName} ${item.firstName}`}
                   style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "10px",
                        objectFit: "contain",
                }}
                />
                {item.lastName} {item.firstName}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default SearchPage;
