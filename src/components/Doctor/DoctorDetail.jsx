import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axios";
import "./DoctorDetail.css";
import Swal from "sweetalert2";
import Footer from "../Footer/Footer";
import BookingModal from "./BookingModal";
import { useTranslation } from "react-i18next";

const timeSlots = [
  "8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"
];

const positionMap = {
  1: "Bác sĩ",
  2: "Tiến sĩ",
  3: "Thạc sĩ",
  4: "Phó giáo sư",
  5: "Giáo sư",
};

const provinceMap = {
  hanoi: "Hà Nội",
  hochiminh: "Hồ Chí Minh",
  danang: "Đà Nẵng",
  lamdong: "Lâm Đồng",
  haiPhong: "Hải Phòng",
  haiDuong: "Hải Dương",
  quangNinh: "Quảng Ninh",
  bacNinh: "Bắc Ninh",
  thanhHoa: "Thanh Hóa",
  nghean: "Nghệ An",
  tiengiang: "Tiền Giang",
};

function DoctorSchedule() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [doctorDetail, setDoctorDetail] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const doctorId = Number(id);

  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8084/api/get-detail-doctor-by-id", {
          params: { id: doctorId }
        });
        if (res.data.errCode === 0) {
          setDoctorDetail(res.data.data);
        } else {
          setDoctorDetail(null);
        }
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết bác sĩ:", error);
        setDoctorDetail(null);
      }
    };

    if (doctorId) fetchDoctorDetail();
  }, [doctorId]);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!doctorId || !selectedDate) {
        setAvailableTimes([]);
        return;
      }
      try {
        const res = await axiosInstance.get("http://localhost:8084/api/get-schedule-doctor-by-date", {
          params: { doctorId, date: selectedDate }
        });

        if (res.data.errCode === 0) {
          const serverTimes = res.data.data.map(item => item.timeType);
          setAvailableTimes(serverTimes);
        } else {
          setAvailableTimes([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy lịch khám:", error);
        setAvailableTimes([]);
      }
    };

    fetchSchedule();
  }, [doctorId, selectedDate]);

const handleTimeClick = (slot) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  if (!userData || userData.role !== "user") {
    Swal.fire({
      title: "Bạn chưa đăng ký hoặc đăng nhập!",
      text: "Vui lòng về trang chủ đăng ký hoặc đăng nhập để tiếp tục đặt lịch khám.",
      icon: "warning",
      confirmButtonText: "Trang chủ"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
    return;
  }
  if (availableTimes.includes(slot)) {
    setSelectedTime(slot);
    setShowModal(true);
  }
};

  const handleBookingSuccess = () => {
    setShowModal(false);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  return (
    <div className="doctor-schedule" style={{ marginTop: "80px" }}>
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

      {/* Doctor Info */}
      {doctorDetail ? (
        <div className="header">
          <img src={`http://localhost:8084${doctorDetail.image}`} alt="Doctor" />
          <div className="info">
            <h2>
              {positionMap[doctorDetail.positionId] || "Chức vụ chưa cập nhật"}{" "}
              {doctorDetail.lastName} {doctorDetail.firstName}
            </h2>
            <p className="short-description">{doctorDetail.Markdown?.description || t("Không có mô tả ngắn")}</p>
            <p className="note" style={{ color: "red" }}>
              {t("Lưu ý: Bác sĩ có nhận tư vấn từ xa.")}
            </p>
            <p><i className="fa-solid fa-location-dot"></i> {provinceMap[doctorDetail.Doctor_Infor?.provinceId]}</p>
          </div>
        </div>
      ) : (
        <p>{t("Đang tải thông tin bác sĩ...")}</p>
      )}

      {/* Booking Section */}
      <div className="booking-layout">
        <div className="schedule-section">
          <label htmlFor="datePicker">{t("Chọn ngày khám")}:</label>
          <input
            id="datePicker"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
            min={new Date().toISOString().split("T")[0]}
          />

          <h3>{t("Lịch khám theo ngày")}</h3>
          <div className="slots">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                className={`slot-button ${availableTimes.includes(slot) ? "available" : "unavailable"}`}
                onClick={() => handleTimeClick(slot)}
                disabled={!availableTimes.includes(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
          <div className="note">{t("Chọn giờ và đặt (miễn phí)")}</div>
        </div>

        {/* Clinic Info */}
        {doctorDetail?.Doctor_Infor && (
          <div className="clinic-info-right">
            <p><strong>{t("ĐỊA CHỈ KHÁM")}</strong></p>
            <p>{doctorDetail.Doctor_Infor.addressClinic}</p>
            <p className="info-line" style={{ color: "#7b61da" }}>{doctorDetail.Doctor_Infor.nameClinic}</p>
            <p><strong>{t("GIÁ KHÁM")}:</strong> {doctorDetail.Doctor_Infor.priceId}</p>
          </div>
        )}
      </div>

      {/* Doctor Full Description */}
      {doctorDetail?.Markdown?.contentHTML && (
        <div
          className="doctor-description-full"
          dangerouslySetInnerHTML={{ __html: doctorDetail.Markdown.contentHTML }}
        />
      )}

      {/* Booking Modal */}
      {showModal && doctorDetail && (
        <BookingModal
          time={selectedTime}
          onClose={() => setShowModal(false)}
          onSuccess={handleBookingSuccess}
          doctorId={doctorId}
          date={selectedDate}
          doctorInfo={doctorDetail}
        />
      )}

      {bookingSuccess && (
        <div className="booking-success-popup">
          <p>{t("Bạn đã đặt lịch thành công - Vui lòng xác nhận email!")}</p>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default DoctorSchedule;
