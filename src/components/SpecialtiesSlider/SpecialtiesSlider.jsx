import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SpecialtiesSlider.css";

// Tùy chỉnh nút Next
const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-next`} onClick={onClick} />;
};

// Tùy chỉnh nút Prev
const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-prev`} onClick={onClick} />;
};

const SpecialtiesSlider = ({ type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [specialtiesData, setSpecialtiesData] = useState([]);
  const [hospitalsData, setHospitalsData] = useState([]);
  const [doctors, setDoctors] = useState([]);

  // Cấu hình slider
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  // Gọi API chuyên khoa
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        if (type === "specialties") {
          const res = await axiosInstance.get("http://localhost:8083/api/get-specialty");
          if (res.data && res.data.errCode === 0) {
            setSpecialtiesData(res.data.data);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy chuyên khoa:", error);
      }
    };
    fetchSpecialties();
  }, [type]);

  // Gọi API cơ sở y tế
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        if (type === "hospitals") {
          const res = await axiosInstance.get("http://localhost:8083/api/get-clinic");
          if (res.data && res.data.errCode === 0) {
            setHospitalsData(res.data.data);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy cơ sở y tế:", error);
      }
    };
    fetchHospitals();
  }, [type]);

  // Gọi API bác sĩ nổi bật
  useEffect(() => {
    if (type === "doctors") {
      axiosInstance
        .get("http://localhost:8083/api/top-doctor-home")
        .then((res) => {
          if (res.data && res.data.data) {
            setDoctors(res.data.data);
          }
        })
        .catch((err) => {
          console.error("Lỗi khi lấy bác sĩ:", err);
        });
    }
  }, [type]);

  // Dữ liệu gói khám bệnh tĩnh
  const healPackage = [
    { title: "Gói khám tổng quát", img: "/goi1.png", link: "/package/general-checkup" },
    { title: "Gói khám tim mạch", img: "/goi2.png", link: "/package/cardiology-checkup" },
    { title: "Gói khám tiểu đường", img: "/goi3.png", link: "/package/diabetes-checkup" },
    { title: "Gói khám ung thư", img: "/goi4.png", link: "/package/cancer-screening" },
    { title: "Gói khám sức khỏe định kỳ", img: "/goi5.png", link: "/package/regular-health" },
  ];

  return (
    <div className="specialties-slider">
      {/* Chuyên khoa phổ biến */}
      {type === "specialties" && (
        <>
          <div className="slider-header">
            <h2>{t("Chuyên khoa phổ biến")}</h2>
            <button className="view-more-btn" onClick={() => navigate("/specialties")}>
              {t("Xem thêm")}
            </button>
          </div>
          <Slider {...settings}>
            {specialtiesData.map((item) => (
              <div
                key={item.id}
                className="specialty-item"
                onClick={() => navigate(`/specialty/${item.id}`)}
              >
                <img src={`http://localhost:8083/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
              </div>
            ))}
          </Slider>
        </>
      )}

      {/* Cơ sở y tế phổ biến */}
      {type === "hospitals" && (
        <>
          <div className="slider-header">
            <h2>{t("Cơ sở y tế phổ biến")}</h2>
            <button className="view-more-btn" onClick={() => navigate("/hospitals")}>
              {t("Xem thêm")}
            </button>
          </div>
          <Slider {...settings}>
            {hospitalsData.map((item) => (
              <div
                key={item.id}
                className="specialty-item"
                onClick={() => navigate(`/hospital/${item.id}`)}
              >
                <img
                  src={`http://localhost:8083/${item.image}` }
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </Slider>
        </>
      )}

      {/* Bác sĩ nổi bật */}
      {type === "doctors" && (
        <>
          <h2>{t("Bác sĩ nổi bật")}</h2>
          <Slider {...settings}>
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="doctor-item"
                onClick={() => navigate(`/doctor/${doctor.id}`)}
                style={{ cursor: "pointer" }}
              >
                {typeof doctor.image === "string" && doctor.image !== "" && (
                  <img
                    src={
                      doctor.image.startsWith("http")
                        ? doctor.image
                        : `http://localhost:8083${doctor.image}`
                    }
                    alt={`${doctor.positionData?.valueVi || ""} ${doctor.lastName || ""} ${doctor.firstName || ""}`}
                  />
                )}
                <p className="doctor-name">
                  {doctor.positionData?.valueVi} {doctor.lastName} {doctor.firstName}
                </p>
                <p className="doctor-desc">
                  {doctor.Doctor_Infor?.Specialty?.name || "Chưa có chuyên khoa"}
                </p>
              </div>
            ))}
          </Slider>
        </>
      )}

      {/* Gói khám bệnh */}
      {type === "healPackage" && (
        <>
          <h2>{t("Gói khám bệnh")}</h2>
          <Slider {...settings}>
            {healPackage.map((item, index) => (
              <div
                key={index}
                className="specialty-item"
                onClick={() => navigate(item.link)}
              >
                <img src={item.img} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
};

export default SpecialtiesSlider;
