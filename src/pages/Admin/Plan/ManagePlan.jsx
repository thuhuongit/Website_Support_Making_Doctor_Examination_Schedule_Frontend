import "./ManagePlan.css";
import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../util/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TIMES = [
  "8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00",
];

function ManageSchedule() {
  const [selectedTimes, setSelectedTimes]   = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate]     = useState("");
  const [doctorList,    setDoctorList]      = useState([]);
  const [bookedTimes,   setBookedTimes]     = useState([]);  

  // Lấy danh sách bác sĩ
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8084/api/get-all-doctors");
        if (res.data.errCode === 0) setDoctorList(res.data.data);
        else toast.error("Không thể tải danh sách bác sĩ.");
      } catch (err) {
        console.error(err);
        toast.error("Lỗi kết nối server.");
      }
    };
    fetchDoctors();
  }, []);

  // Lấy giờ đã lưu từ DB (API mới)
  const loadBookedTimes = useCallback(async (doctorId, dateISO) => {
    if (!doctorId || !dateISO) {
      setBookedTimes([]);
      setSelectedTimes([]);
      return;
    }

    try {
      const res = await axiosInstance.get(
        "http://localhost:8084/api/get-schedule-doctor-by-date",
        { params: { doctorId, date: dateISO } }
      );

      if (res.data.errCode === 0 && res.data.data.length > 0) {
        const timesFromAPI = res.data.data.map(item => item.timeType);
        setBookedTimes(timesFromAPI);
        setSelectedTimes(timesFromAPI); 
      } else {
        setBookedTimes([]);
        setSelectedTimes([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi khi tải lịch khám.");
      setBookedTimes([]);
      setSelectedTimes([]);
    }
  }, []);

  // Gọi khi thay bác sĩ hoặc ngày
  useEffect(() => {
    if (!selectedDoctor || !selectedDate) {
      setBookedTimes([]);
      setSelectedTimes([]);
      return;
    }
    const isoDate = new Date(selectedDate).toISOString().split("T")[0];
    loadBookedTimes(selectedDoctor, isoDate);
  }, [selectedDoctor, selectedDate, loadBookedTimes]);

  // Bấm chọn / bỏ chọn giờ (không cho bỏ chọn giờ đã lưu trước đó)
  const toggleTime = (time) => {
    if (bookedTimes.includes(time)) return;
    setSelectedTimes(prev =>
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  // Lưu lịch khám
  const handleSaveSchedule = async () => {
    if (!selectedDoctor || !selectedDate || selectedTimes.length === 0) {
      toast.error("Vui lòng chọn đủ bác sĩ, ngày và giờ.");
      return;
    }

    const dateObj = new Date(selectedDate);
    if (isNaN(dateObj)) {
      toast.error("Ngày không hợp lệ.");
      return;
    }
    const isoDate = dateObj.toISOString().split("T")[0];

    // Chỉ gửi những giờ chưa có trong DB
    const timesToSave = selectedTimes.filter(t => !bookedTimes.includes(t));
    if (timesToSave.length === 0) {
      toast.warn("Tất cả giờ đã có trong lịch.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "http://localhost:8084/api/bulk-create-schedule",
        {
          doctorId: selectedDoctor,
          date: isoDate,
          arrSchedule: timesToSave
        }
      );
      if (res.data.errCode === 0) {
        toast.success("Lưu lịch thành công!");
        loadBookedTimes(selectedDoctor, isoDate); 
      } else {
        toast.error(res.data.errMessage || "Lỗi khi lưu.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Có lỗi khi lưu lịch.");
    }
  };

  return (
    <div className="schedule-container">
      <h2 className="title">QUẢN LÝ KẾ HOẠCH KHÁM BỆNH CỦA BÁC SĨ</h2>

      {/* Chọn bác sĩ và ngày */}
      <div className="controls">
        <select
          className="doctor-select"
          value={selectedDoctor}
          onChange={e => {
            setSelectedDoctor(e.target.value);
            setSelectedTimes([]);
          }}
        >
          <option value="">-- Chọn bác sĩ --</option>
          {doctorList.map(d => (
            <option key={d.id} value={d.id}>
              {d.lastName} {d.firstName}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="date-input"
          value={selectedDate}
          onChange={e => {
            setSelectedDate(e.target.value);
            setSelectedTimes([]);
          }}
        />
      </div>

      {/* Hiển thị khung giờ */}
      <div className="time-slots">
        {TIMES.map(time => {
          const isBooked   = bookedTimes.includes(time);
          const isSelected = selectedTimes.includes(time);

          return (
            <button
              key={time}
              onClick={() => toggleTime(time)}
              disabled={isBooked}
              className={`time-button ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}`}
              title={isBooked ? "Đã có lịch" : ""}
            >
              {time}
            </button>
          );
        })}
      </div>

      {/* Nút lưu */}
      <button
        className="save-button"
        onClick={handleSaveSchedule}
        disabled={bookedTimes.length === TIMES.length}
      >
        Lưu thông tin
      </button>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default ManageSchedule;
