import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./DoctorDetail.css";
import Footer from "../Footer/Footer";

const DoctorDetail = () => {
  const { id } = useParams();
  const [selectedTime, setSelectedTime] = useState(null);

  

  return (
    
    <div className="doctor-detail-container">
  <div className="doctor-intro">
    <img src="/avatar.jpg" className="doctor-avatar" />
    <div className="doctor-info">
      <div className="doctor-name">BS. Nguyễn Văn A</div>
      <div className="doctor-position">Chuyên khoa Nội tổng quát</div>
    </div>
  </div>

  <div className="main-content">
    <div className="left-content">
      <div className="doctor-description">
        {/* Render HTML từ backend */}
        <div dangerouslySetInnerHTML={{ __html: "<p>Bác sĩ có hơn 10 năm kinh nghiệm...</p>" }} />
      </div>
    </div>

    <div className="right-content">
      <div className="doctor-schedule">
        {/* Component lịch khám */}
        Chọn lịch khám tại đây
      </div>

      <div className="doctor-extra-info">
        {/* Component thông tin thêm */}
        Địa chỉ, giá khám, hình thức thanh toán
      </div>
    </div>
  </div>




<Footer/>
    </div>
  );
};

export default DoctorDetail;
