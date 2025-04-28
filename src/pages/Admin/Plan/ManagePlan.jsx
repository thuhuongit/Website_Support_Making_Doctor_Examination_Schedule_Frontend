import './ManagePlan.css';
import { useState } from 'react';

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

function ManageSchedule() {
  const [selectedTimes, setSelectedTimes] = useState([]);

  const toggleTime = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  return (
    <div className="schedule-container">
      <h2 className="title">QUẢN LÝ KẾ HOẠCH KHÁM BỆNH CỦA BÁC SĨ</h2>
      <div className="controls">
        <select className="doctor-select">
          <option>Nguyễn Duy Khánh</option>
        </select>
        <input type="date" className="date-input" />
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
      <button className="save-button">Lưu thông tin</button>
    </div>
  );
}

export default ManageSchedule;
