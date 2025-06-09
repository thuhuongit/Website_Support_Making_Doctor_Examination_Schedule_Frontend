import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SpecialtiesSlider.css";

const positionMap = {
  1: "Bác sĩ",
  2: "Tiến sĩ",
  3: "Thạc sĩ",
  4: "Phó giáo sư",
  5: "Giáo sư",
};

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
  slidesToShow: Math.min(4, type === "doctors" ? doctors.length : 4),
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};


  // Gọi API chuyên khoa
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        if (type === "specialties") {
          const res = await axiosInstance.get("http://localhost:8084/api/get-specialty");
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
          const res = await axiosInstance.get("http://localhost:8084/api/get-clinic");
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
        .get("http://localhost:8084/api/top-doctor-home")
        .then((res) => {
          if (res.data && res.data.data) {
            setDoctors(res.data.data);
            console.log("Doctors result:", res.data.data);
          }
        })
        .catch((err) => {
          console.error("Lỗi khi lấy bác sĩ:", err);
        });
    }
  }, [type]);

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
                <img src={`http://localhost:8084/${item.image}`} alt={item.name} />
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
                  src={`http://localhost:8084/${item.image}` }
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
      {doctors.map((doctor) => {

        console.log("Rendering doctor:", doctor.id);
        const positionName = positionMap[doctor.positionId] || doctor.positionData?.valueVi || "";

        return (
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
                    : `http://localhost:8084${doctor.image}`
                }
                alt={`${positionName} ${doctor.lastName || ""} ${doctor.firstName || ""}`}
              />
            )}
            <p className="doctor-name" style={{ fontWeight: "bold", color: "black" }}>
              {`${positionName} ${doctor.lastName || ""} ${doctor.firstName || ""}`}
            </p>
            <p className="doctor-desc">
              {doctor.Doctor_Infor?.specialtyData?.name || "Chưa có chuyên khoa"}
            </p>
          </div>
        );
      })}
    </Slider>
        </>
      )}
    </div>
  );
};

export default SpecialtiesSlider;
