import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../util/axios";
import "./DoctorDetail.css";
import Footer from "../Footer/Footer";
import BookingModal from "./BookingModal";

const timeSlots = [
  "8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"
];

function DoctorSchedule() {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [doctorDetail, setDoctorDetail] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const doctorId = Number(id);

  // Lấy thông tin chi tiết bác sĩ
  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8083/api/get-detail-doctor-by-id", {
          params: { id: doctorId }
        });
        if (res.data.errCode === 0) {
          setDoctorDetail(res.data.data);
        } else {
          setDoctorDetail(null);
        }
      } catch (error) {
        console.error("Lỗi khi lấy detail bác sĩ:", error);
        setDoctorDetail(null);
      }
    };

    if (doctorId) fetchDoctorDetail();
  }, [doctorId]);

  // Lấy lịch khám theo ngày
  useEffect(() => {
    const fetchSchedule = async () => {
      if (!doctorId || !selectedDate) {
        setAvailableTimes([]);
        return;
      }

      try {
        const res = await axiosInstance.get("http://localhost:8083/api/get-schedule-doctor-by-date", {
          params: {
            doctorId: doctorId,
            date: selectedDate,
          }
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
    <div className="doctor-schedule">
      {/* Thông tin bác sĩ */}
      {doctorDetail ? (
        <div className="header">
          <img
            src={`http://localhost:8083${doctorDetail.image}`}
            alt="Doctor"
          />

          <div className="info">
            <h2>
              {doctorDetail.positionData?.valueVi} {doctorDetail.firstName} {doctorDetail.lastName}
            </h2>
            <p className="short-description">
              {doctorDetail.Markdown?.description}
            </p>
            <p className="note">Lưu ý: Bác sĩ có nhận tư vấn từ xa.</p>
          </div>
        </div>
      ) : (
        <p>Đang tải thông tin bác sĩ...</p>
      )}

      {/* Chọn ngày khám */}
      <div className="schedule-section">
        <label htmlFor="datePicker">Chọn ngày khám:</label>
        <input
          id="datePicker"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="date-picker"
        />

        <h3>Lịch khám theo ngày</h3>
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
        <div className="note">Chọn giờ và đặt (miễn phí)</div>
      </div>

      {/* Mô tả chi tiết bác sĩ */}
      {doctorDetail?.Markdown?.contentHTML && (
        <div
          className="doctor-description-full"
          dangerouslySetInnerHTML={{ __html: doctorDetail.Markdown.contentHTML }}
        />
      )}

      {/* Modal đặt lịch */}
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

      {/* Thông báo thành công */}
      {bookingSuccess && (
        <div className="booking-success-popup">
          <p>Bạn đã đặt lịch thành công - Vui lòng xác nhận email!</p>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default DoctorSchedule;
