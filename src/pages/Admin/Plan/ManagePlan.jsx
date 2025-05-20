import './ManagePlan.css';
import { useState } from 'react';
import axiosInstance from "../../../util/axios";
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toast styles
import Swal from "sweetalert2";

const times = [
  "8:00 - 9:00",
  "9:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

const transformedTimes = times.map(time => {
  return { time, maxNumber: 10 }; // Convert string to object
});

console.log(transformedTimes);

function ManageSchedule() {
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(""); // doctorId
  const [selectedDate, setSelectedDate] = useState("");

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
  
    console.log("Data to send:", scheduleData);
  
    try {
      const response = await axiosInstance.post('http://localhost:8083/api/bulk-create-schedule', scheduleData);
  
      console.log("API Response:", response);
  
      if (response.data.errCode === 0) {
        // Hiển thị thông báo thành công
        toast.success("Lịch khám đã được lưu thành công!");
  
        // Reset trạng thái sau khi lưu thành công
        setSelectedDoctor("");  // Reset bác sĩ
        setSelectedDate("");    // Reset ngày
        setSelectedTimes([]);   // Reset các giờ đã chọn
  
        // Log để chắc chắn quá trình thành công
        console.log("Schedule saved successfully.");
      } else {
        // Nếu có lỗi, hiển thị thông báo lỗi
        toast.error(response.data.errMessage);
      }
    } catch (error) {
      console.error("Error saving schedule:", error);
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
          onChange={(e) => setSelectedDoctor(e.target.value)} // Lưu doctorId
        >
          <option value="">Chọn bác sĩ</option>
          <option value="1">Nguyễn Duy Khánh</option> {/* DoctorId là 1 */}
          {/* Thêm các bác sĩ khác với doctorId tương ứng */}
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
