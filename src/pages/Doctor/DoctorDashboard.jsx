import React, { useState, useEffect } from "react";
import axiosInstance from "../../util/axios"
import DoctorSidebar from "../../components/DoctorSidebar/DoctorSidebar";
import "./Doctor.css";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");  // State for selected date
  const [doctorId, setDoctorId] = useState("123"); // Replace with actual doctorId if required

  useEffect(() => {
    if (selectedDate) {
      fetchAppointments(selectedDate);
    }
  }, [selectedDate]);  // Fetch appointments when date is selected

  const fetchAppointments = (date) => {
    axiosInstance
      .get(`http://localhost:8081/api/get-list-patient-for-doctor`)
      .then((response) => setAppointments(response.data))
      .catch((error) => console.log(error));
  };

  const confirmAppointment = (id) => {
    axiosInstance
      .post(`http://localhost:8081/api/send-remedy`, { appointmentId: id })
      .then((response) => {
        alert("Đã xác nhận lịch khám");
        fetchAppointments(selectedDate);  // Refresh appointments after confirming
      })
      .catch((error) => console.log(error));
  };

  const cancelAppointment = (id) => {
    axiosInstance
      .post(`http://localhost:8081/api/cancel-booking`, { appointmentId: id })
      .then((response) => {
        alert("Đã hủy lịch khám");
        fetchAppointments(selectedDate);  // Refresh appointments after cancelling
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="doctor-layout">
      <DoctorSidebar />

      <div className="doctor-main">
        <div className="doctor-header">
          <h2>QUẢN LÝ BỆNH NHÂN KHÁM BỆNH</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="date-picker"
          />
        </div>

        <table className="patient-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Thời gian</th>
              <th>Họ và tên</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Giới tính</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt, index) => (
                <tr key={appt.id}>
                  <td>{index + 1}</td>
                  <td>{appt.time}</td>
                  <td>{appt.name}</td>
                  <td>{appt.address}</td>
                  <td>{appt.phone}</td>
                  <td>{appt.gender}</td>
                  <td>
                    <button
                      className="btn confirm"
                      onClick={() => confirmAppointment(appt.id)}
                    >
                      Xác nhận
                    </button>
                    <button
                      className="btn cancel"
                      onClick={() => cancelAppointment(appt.id)}
                    >
                      Huỷ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Không có lịch khám cho ngày này.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorDashboard;
