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
  const [showAllSpecialties, setShowAllSpecialties] = useState(false);
  const [hospitalsData, setHospitalsData] = useState([]);
  const [doctors, setDoctors] = useState([]);
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

 
  //Chuyên khoa phổ biến 
  useEffect(() => {
    console.log("Type:", type);
    const fetchData = async () => {
      try {
        if (type === "specialties") {
         const res = await axiosInstance.get("http://localhost:8083/api/get-specialty");
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

  const handleShowAllClick = () => {
    setShowAllSpecialties(true);
  };

  const displayedSpecialties = showAllSpecialties ? specialtiesData : specialtiesData.slice(0, 3);

  
  const hospitals = [
    { title: "Bệnh viện Hữu nghị Việt Đức", img: "/1.png", link: "/hospital/viet-duc" },
    { title: "Bệnh viện Chợ Rẫy", img: "/ray.png", link: "/hospital/cho-ray" },
    { title: "Tầm Soát Bệnh Để Sống Thọ Hơn", img: "/check.png", link: "/hospital/doctor-check" },
    { title: "Phòng khám Bệnh viện Đại học Y Dược 1", img: "/y.png", link: "/hospital/y-duoc" },
    { title: "Bệnh viện Ung bướu Hưng Việt", img: "/viet.png", link: "/hospital/ung-buou" },
    { title: "Hệ thống y tế MEDLATEC", img: "/ha.jpg", link: "/hospital/medlatec" },
  ];


  // Bác sĩ nổi bật 
  useEffect(() => {
    if (type === "doctors") {
      // Gọi API lấy 4 bác sĩ nổi bật
      axiosInstance
         .get("http://localhost:8083/api/top-doctor-home")
         .then((res) => {
           console.log("API response:", res.data);
           if (res.data && res.data.data) {
              setDoctors(res.data.data);
       }
  })

        .catch((err) => {
          console.error("Lỗi khi lấy bác sĩ:", err);
        });
    }
  }, [type]);



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
    <div className="slider-header">
      <h2>{t("Chuyên khoa phổ biến")}</h2>
      <button className="view-more-btn" onClick={() => navigate("/specialties")}>
        {t("Xem thêm")}
      </button>
    </div>
    <Slider {...settings}>
      {specialtiesData.map((item, index) => (
        <div
          key={index}
          className="specialty-item"
          onClick={() => navigate(`/specialty/${item.id || item.name}`)}
        >
          <img src={`http://localhost:8083/${item.image}`} alt={item.name} />
          <p>{item.name}</p>
        </div>
      ))}
    </Slider>
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
             {doctors.map((doctor) => (
               <div
                  key={doctor.id}
                  className="doctor-item"
                  onClick={() => navigate(`/doctor/${doctor.id}`)}
                  style={{ cursor: "pointer" }}
                >
                 {typeof doctor.image === "string" && doctor.image !== "" && (
                  <img
                     src={`http://localhost:8083${doctor.image}`}
                     alt={`${doctor.positionData?.valueVi || ""} ${doctor.firstName || ""} ${doctor.lastName || ""}`}
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
