import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SpecialtiesSlider.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../util/axios";

const SpecialtiesSlider = ({ type }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Khai báo state để lưu dữ liệu chuyên khoa
  const [specialtiesData, setSpecialtiesData] = useState([]);
  const [hospitalsData, setHospitalsData] = useState([]);
  const [doctorsData, setDoctorsData] = useState([]);
  const [healPackageData, setHealPackageData] = useState([]);

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

  // Gọi API khi component mount hoặc type thay đổi
  useEffect(() => {
    console.log("Type:", type); // 
    const fetchData = async () => {
      try {
        if (type === "specialties") {
         const res = await axiosInstance.get("http://localhost:8082/api/get-specialty");
         console.log("Fetched specialties:", res.data); 
          if (res.data && res.data.errCode === 0) {
           setSpecialtiesData(res.data.data);
           console.log("Specialties data set:", res.data.data); 
  }
}
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    fetchData();
  }, [type]);

  
  const hospitals = [
    { title: "Bệnh viện Hữu nghị Việt Đức", img: "/1.png", link: "/hospital/viet-duc" },
    { title: "Bệnh viện Chợ Rẫy", img: "/ray.png", link: "/hospital/cho-ray" },
    { title: "Tầm Soát Bệnh Để Sống Thọ Hơn", img: "/check.png", link: "/hospital/doctor-check" },
    { title: "Phòng khám Bệnh viện Đại học Y Dược 1", img: "/y.png", link: "/hospital/y-duoc" },
    { title: "Bệnh viện Ung bướu Hưng Việt", img: "/viet.png", link: "/hospital/ung-buou" },
    { title: "Hệ thống y tế MEDLATEC", img: "/ha.jpg", link: "/hospital/medlatec" },
  ];


  const doctor = [
    { title: "Tiến sĩ, Bác sĩ chuyên khoa II Lê Quốc Việt", img: "/2.png", desc: "Cơ Xương Khớp, Nội khoa", link: "/doctor/le-quoc-viet"},
    { title: "Tiến sĩ, Bác sĩ Chuyên khoa II Lã Thị Bưởi", img: "/3.jpg", desc: "Sức khỏa tâm thần", link: "/doctor/la-thi-buoi" },
    { title: "Bác sĩ Chuyên khoa II Võ Văn Mẫn", img: "/4.jpg", desc: "Cơ Xương Khớp, Chấn thương chỉnh hình", link: "/doctor/vo-van-man" },
    { title: "Thạc sĩ, Bác sĩ Nguyễn Thị Thanh Nhàn", img: "/5.png", desc: "Thần kinh", link: "/doctor/nguyen-thi-thanh-nhan" },
    { title: "Thạc sĩ, Bác sĩ Nguyễn Văn Nghị", img: "/6.png", desc: "Tiểu đường - Nội tiết, Ung bướu, Tuyến giáp", link: "/doctor/nguyen-van-nghi"},
    { title: "Thạc sĩ, Bác sĩ Trần Thị Mai Thy", img: "/7.jpg", desc: "Thầm kinh" },
  ];

  const healPackage = [
    { title: "Gói khám tổng quát", img: "/ói.png", link: "/package/general-checkup" },
    { title: "Gói khám tim mạch", img: "/goi2.png", link: "/package/cardiology-checkup" },
    { title: "Gói khám tiểu đường", img: "/goi3.png", link: "/package/diabetes-checkup" },
    { title: "Gói khám ung thư", img: "/ói.png", link: "/package/cancer-screening" },
    { title: "Gói khám sức khỏe định kỳ", img: "/ói.png", link: "/package/regular-health" },
  ];

  

  return (
    <div className="specialties-slider">
     {type === "specialties" && (
        <>
          <h2>{t("Chuyên khoa phổ biến")}</h2>
           <div className="specialties-slider-frame">
          <Slider {...settings}>
            {specialtiesData.map((item, index) => (
              <div key={index} className="specialty-item">
                <img
                  src={`http://localhost:8082${item.image}`}
                  alt={item.name}
                />
                <p>{item.name}</p>
              </div>
            ))}
          </Slider>
          </div>
        </>
      )}

    {type === "hospitals" && (
      <>
        <h2>{t("Cơ sở y tế nổi bật")}</h2>
        <Slider {...settings}>
          {hospitals.map((item, index) => (
            <div key={index} className="specialty-item" onClick={() => navigate(item.link)}>
              <img src={item.img} alt={item.title} />
              <p>{item.title}</p>
            </div>
          ))}
        </Slider>
      </>
    )}

    {type === "doctors" && (
      <>
        <h2>{t("Bác sĩ nổi bật")}</h2>
        <Slider {...settings}>
          {doctor.map((item, index) => (
            <div key={index} className="doctor-item" onClick={() => navigate(item.link)}>
              <img src={item.img} alt={item.title} />
              <p className="doctor-name">{item.title}</p>
              <p className="doctor-desc">{item.desc}</p>
            </div>
          ))}
        </Slider>
      </>
    )}
    {type === "healPackage" && (
      <>
        <h2>{t("Gói khám bệnh")}</h2>
        <Slider {...settings}>
          {healPackage.map((item, index) => (
            <div key={index} className="specialty-item" onClick={() => navigate(item.link)}>
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

// Tùy chỉnh nút Next
const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-next`} onClick={onClick} />;
};

// Tùy chỉnh nút Back
const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-prev`} onClick={onClick} />;
};
export default SpecialtiesSlider;
