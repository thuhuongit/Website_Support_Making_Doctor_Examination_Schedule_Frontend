import './TimeSlotButton.css';

const TimeSlotButton = ({ time, selected, onClick }) => {
  return (
    <button
      className={`timeslot-btn ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {time}
    </button>
  );
};

export default TimeSlotButton;
