import './ManagePlan.css';
import { useState, useEffect } from 'react';
import axiosInstance from "../../../util/axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const times = [
  "8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
  "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00",
];

function ManageSchedule() {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [doctorList, setDoctorList] = useState([]); // Danh sách bác sĩ
  const uniqueDoctors = doctorList.filter((doctor, index, self) =>
  index === self.findIndex((d) => d.id === doctor.id)
);


  // Gọi API để lấy danh sách bác sĩ
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axiosInstance.get("http://localhost:8084/api/get-all-doctors");
        if (res.data.errCode === 0) {
          setDoctorList(res.data.data);
        } else {
          toast.error("Không thể tải danh sách bác sĩ.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bác sĩ:", error);
        toast.error("Lỗi kết nối đến server.");
      }
    };

    fetchDoctors();
  }, []);

  const toggleTime = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const handleSaveSchedule = async () => {
    if (!selectedDoctor || !selectedDate || selectedTimes.length === 0) {
      toast.error("Vui lòng chọn đủ thông tin: bác sĩ, ngày và giờ khám.");
      return;
    }

    let dateToSend = selectedDate;
    if (!(selectedDate instanceof Date)) {
      dateToSend = new Date(selectedDate);
    }

    if (isNaN(dateToSend)) {
      toast.error("Ngày không hợp lệ.");
      return;
    }

    const isoDateOnly = dateToSend.toISOString().split('T')[0];
    const scheduleData = {
      doctorId: selectedDoctor,
      date: isoDateOnly,
      arrSchedule: selectedTimes,
    };

    try {
      const response = await axiosInstance.post('http://localhost:8084/api/bulk-create-schedule', scheduleData);

      if (response.data.errCode === 0) {
        toast.success("Lịch khám đã được lưu thành công!");
        setSelectedDoctor("");
        setSelectedDate("");
        setSelectedTimes([]);
      } else {
        toast.error(response.data.errMessage);
      }
    } catch (error) {
      console.error("Lỗi khi lưu lịch khám:", error);
      toast.error("Có lỗi xảy ra khi lưu lịch khám.");
    }
  };
   

  return (
    <div className="schedule-container">
      <h2 className="title">QUẢN LÝ KẾ HOẠCH KHÁM BỆNH CỦA BÁC SĨ</h2>

      <div className="controls">
        <select 
          className="doctor-select"
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
        >
          <option value="">-- Chọn bác sĩ --</option>
          {uniqueDoctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.lastName} {doctor.firstName}
            </option>
          ))}
        </select>

        <input 
          type="date" 
          className="date-input" 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="time-slots">
        {times.map((time) => (
          <button
            key={time}
            onClick={() => toggleTime(time)}
            className={`time-button ${selectedTimes.includes(time) ? 'selected' : ''}`}
          >
            {time}
          </button>
        ))}
      </div>

      <button className="save-button" onClick={handleSaveSchedule}>Lưu thông tin</button>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
      />
    </div>
  );
}

export default ManageSchedule;
