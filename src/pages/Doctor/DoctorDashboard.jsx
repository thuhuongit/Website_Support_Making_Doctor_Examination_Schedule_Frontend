import React, { useState, useEffect } from "react";
import axiosInstance from "../../util/axios";
import DoctorSidebar from "../../components/DoctorSidebar/DoctorSidebar";
import "./Doctor.css";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [doctorId, setDoctorId] = useState("1"); // Lấy từ localStorage hoặc context nếu có

  useEffect(() => {
    if (selectedDate && doctorId) {
      fetchAppointments(selectedDate);
    }
  }, [selectedDate]);

  const fetchAppointments = (date) => {
    if (doctorId && date) {
      axiosInstance
        .get("http://localhost:8081/api/get-list-patient-for-doctor", {
          params: {
            doctorId: doctorId,  
            date: date,  
          },
        })
        .then((response) => setAppointments(response.data.data || []))
        .catch((error) => console.log(error));
    }
  };
  
  

  const confirmAppointment = (bookingId) => {
    axiosInstance
      .post(`http://localhost:8081/api/send-remedy`, { appointmentId: bookingId }) 
      .then(() => {
        alert("Đã xác nhận lịch khám");
        fetchAppointments(selectedDate);
      })
      .catch((error) => console.log(error));
  };

  const cancelAppointment = (bookingId) => {
    axiosInstance
      .post(`http://localhost:8081/api/cancel-booking`, { appointmentId: bookingId }) 
      .then(() => {
        alert("Đã huỷ lịch khám");
        fetchAppointments(selectedDate);
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
              <th>email</th>
              <th>firstName</th>
              <th>address</th>
              <th>gender</th>
              <th>phone</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{appt.timeTypeDataPatient?.valueVi || "--"}</td>
                  <td>{appt.patientData?.firstName || "--"}</td>
                  <td>{appt.patientData?.address || "--"}</td>
                  <td>{appt.patientData?.phone || "--"}</td>
                  <td>{appt.patientData?.genderData?.valueVi || "--"}</td>
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
