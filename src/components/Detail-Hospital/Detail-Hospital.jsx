import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import "./Detail-Hospital.css";
import Footer from "../Footer/Footer";
import axiosInstance from "../../util/axios";

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospitalData, setHospitalData] = useState({});
  const { t } = useTranslation();

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:8084/api/get-detail-clinic-by-id?id=${id}`
        );
        if (response.data.errCode === 0) {
          setHospitalData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching hospital details:", error);
      }
    };

    fetchHospitalData();
  }, [id]);

  return (
    <div className="hospital-container">
      {/* Navbar */}
      <nav className="navbar" style={{ marginTop: '0px'}}>
        <div className="logo" onClick={() => navigate("/")}>
          <img className="logo-img" src="/logo.png" alt="BookingCare" style={{width: '50px'}} />
          <span className="logo-text">BookingCare</span>
        </div>
        <ul className="nav-links">
          <li>{t("Chuyên khoa")}<br /><span>{t("Tìm bác sĩ theo chuyên khoa")}</span></li>
          <li>{t("Cơ sở y tế")}<br /><span>{t("Chọn bệnh viện phòng khám")}</span></li>
          <li>{t("Bác sĩ")}<br /><span>{t("Chọn bác sĩ giỏi")}</span></li>
          <li>{t("Gói khám")}<br /><span>{t("Khám sức khỏe tổng quát")}</span></li>
        </ul>
      </nav>

      {/* Ảnh nền */}
      <div
        className="hospital-banner"
        style={{
          backgroundImage: hospitalData?.image
            ? `url(http://localhost:8084/${hospitalData.image})`
            : "none",
        }}
      >
        <div className="hospital-overlay"></div>
      </div>

      {/* Nội dung chính */}
      <div className="hospital-content">
        {/* Thông tin bệnh viện */}
        <div className="hospital-info">
          <img
            src={
              hospitalData?.image
                ? `http://localhost:8084/${hospitalData.image}`
                : "/default-logo.png"
            }
            alt={hospitalData?.name || "Hospital"}
            className="hospital-logo"
          />
          <div>
            <h1 className="hospital-name">{hospitalData?.name}</h1>
            <p className="hospital-address">{hospitalData?.address}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="hospital-tabs">
          {["Giới thiệu", "Thế mạnh chuyên môn", "Trang thiết bị", "Quy trình khám"].map(
            (tab, index) => (
              <button
                key={index}
                className="tab-button"
                onClick={() => {
                  const section = document.getElementById(`section-${index}`);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Info Box */}
        <div className="info-box yellow">
          BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, 
          hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
        </div>

        <div className="info-box blue">
          <p>
            Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu cầu, Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám BookingCare.
          </p>
          <ul>
            <li>Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu kinh nghiệm</li>
            <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch)</li>
            <li>Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám trước</li>
            <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
          </ul>
        </div>

        {/* Mô tả HTML từ backend */}
        {hospitalData?.description && (
          <div
            className="hospital-description"
            style={{ marginTop: "20px", maxWidth: "1500px" }}
            dangerouslySetInnerHTML={{ __html: hospitalData.description }}
          />
        )}

        <Footer />

        {/* Nút đặt khám */}
        <div className="booking-button-wrapper">
          <button
            className="booking-button"
            onClick={() => navigate(`/dat-kham/${id}`)}
          >
            Chọn Đặt Khám
          </button>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
