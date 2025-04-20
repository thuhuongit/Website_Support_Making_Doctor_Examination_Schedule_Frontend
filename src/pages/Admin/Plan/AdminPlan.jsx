import { useState } from 'react';
import Sidebar from './components/Sidebar';
import TimeSlotButton from './components/TimeSlotButton';
import './AdminPlan.css';

const Plan = () => {
  const doctors = ['Nguyễn Duy Khánh', 'Trần Văn A', 'Lê Thị B'];
  const timeSlots = [
    '8:00 - 9:00',
    '9:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
  ];

  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);

  const toggleSlot = (slot) => {
    setSelectedSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <h2>QUẢN LÝ KẾ HOẠCH KHÁM BỆNH CỦA BÁC SĨ</h2>
        <div className="form-row">
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">Chọn bác sĩ</option>
            {doctors.map((doc) => (
              <option key={doc}>{doc}</option>
            ))}
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="timeslot-container">
          {timeSlots.map((slot) => (
            <TimeSlotButton
              key={slot}
              time={slot}
              selected={selectedSlots.includes(slot)}
              onClick={() => toggleSlot(slot)}
            />
          ))}
        </div>
        <button className="save-btn">Lưu thông tin</button>
      </div>
    </div>
  );
};

export default Plan;
