import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Hospital.css";
import Footer from "../Footer/Footer";
import axiosInstance from "../../util/axios";

const HospitalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hospitalData, setHospitalData] = useState({});

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await axiosInstance.get(
          `http://localhost:8083/api/get-detail-clinic-by-id?id=${id}`
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
      {/* Ảnh nền */}
      <div
        className="hospital-banner"
        style={{
          backgroundImage: hospitalData.image
            ? `url(http://localhost:8083/${hospitalData.image})`
            : "none",
        }}
      >
        <div className="hospital-overlay"></div>
      </div>

      {/* Nội dung */}
      <div className="hospital-content">
        <div className="hospital-info">
          <img
            src={
              hospitalData.image
                ? `http://localhost:8083/${hospitalData.image}`
                : "/default-logo.png"
            }
            alt={hospitalData.name}
            className="hospital-logo"
          />
          <div>
            <h1 className="hospital-name">{hospitalData.name}</h1>
            <p className="hospital-address">{hospitalData.address}</p>
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

        {/* Khung vàng */}
        <div className="info-box yellow">
          BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, 
          hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
        </div>

        {/* Khung xanh */}
        <div className="info-box blue">
          <p>
            Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu cầu, Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám BookingCare.
          </p>
          <ul>
            <li>Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu kinh nghiệm</li>
            <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch) </li>
            <li>Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám trước</li>
            <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
          </ul>
          
        </div>


        <div
         className="hospital-description" style={{ marginTop: "20px", maxWidth: "1500px" }}
         dangerouslySetInnerHTML={{ __html: hospitalData.description || "" }}
        ></div>

        <Footer />

        {/* Nút đặt khám */}
        <button className="booking-button" onClick={() => navigate(`/dat-kham/${id}`)}>
          Chọn Đặt Khám
        </button>
      </div>
    </div>
  );
};

export default HospitalDetail;
