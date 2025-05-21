import React, { useState, useEffect } from "react";
import axiosInstance from "../../util/axios";
import DoctorSidebar from "../../components/DoctorSidebar/DoctorSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Doctor.css";

const DoctorDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const defaultDoctorId = user?.id;

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(defaultDoctorId || "");
  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);

  // Lấy danh sách bác sĩ khi mount component
  useEffect(() => {
    axiosInstance
      .get("http://localhost:8083/api/get-all-doctors")
      .then((res) => {
        setDoctors(res.data.data || []);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy danh sách bác sĩ:", err);
      });
  }, []);

  // Khi đổi bác sĩ hoặc ngày thì lấy lại lịch khám
  useEffect(() => {
    if (selectedDoctorId && selectedDate) {
      fetchAppointments(selectedDoctorId, selectedDate);
    } else {
      setAppointments([]);
    }
  }, [selectedDoctorId, selectedDate]);

  const fetchAppointments = (doctorId, date) => {
    axiosInstance
      .get("http://localhost:8083/api/get-list-patient-for-doctor", {
        params: {
          doctorId,
          date,
        },
      })
      .then((response) => setAppointments(response.data.data || []))
      .catch((error) => console.log(error));
  };

  const getStatusLabel = (statusId) => {
    switch (statusId) {
      case "S1":
        return "Đã đặt";
      case "S2":
        return "Đã xác nhận";
      case "S3":
        return "Đã khám";
      case "S4":
        return "Đã huỷ";
      default:
        return "Không rõ";
    }
  };

  const confirmAppointment = (appointment) => {
    axiosInstance
      .post("http://localhost:8083/api/send-remedy", {
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        timeType: appointment.timeType,
        date: appointment.date,
      })
      .then(() => {
        const updatedAppointments = appointments.map((apptItem) =>
          apptItem.id === appointment.id ? { ...apptItem, statusId: "S2" } : apptItem
        );
        setAppointments(updatedAppointments);
        toast.success("Đã xác nhận lịch khám");
      })
      .catch(() => {
        toast.error("Lỗi khi xác nhận lịch khám");
      });
  };

  const cancelAppointment = (bookingId) => {
    axiosInstance
      .post("http://localhost:8083/api/cancel-booking", { appointmentId: bookingId })
      .then(() => {
        const updatedAppointments = appointments.map((appt) =>
          appt.id === bookingId ? { ...appt, statusId: "S4" } : appt
        );
        setAppointments(updatedAppointments);
        toast.success("Đã huỷ lịch khám");
      })
      .catch(() => {
        toast.error("Lỗi khi huỷ lịch khám");
      });
  };

  return (
    <div className="doctor-layout">
      <DoctorSidebar />
      <div className="doctor-main">
        <div className="doctor-header">
          <h2>QUẢN LÝ BỆNH NHÂN KHÁM BỆNH</h2>

          {/* Dropdown chọn bác sĩ */}
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="doctor-select"
          >
            <option value="">-- Chọn bác sĩ --</option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.firstName} {doc.lastName}
              </option>
            ))}
          </select>

          {/* Chọn ngày */}
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
              <th>Trạng thái</th>
              <th>Email</th>
              <th>Họ tên</th>
              <th>Địa chỉ</th>
              <th>Giờ khám</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt, index) => (
                <tr key={appt.id || index}>
                  <td>{index + 1}</td>
                  <td>
                    <span className={`status-badge ${appt.statusId}`}>
                      {getStatusLabel(appt.statusId)}
                    </span>
                  </td>
                  <td>{appt.patientData?.email || "--"}</td>
                  <td>
                    {appt.patientData?.firstName || "--"}{" "}
                    {appt.patientData?.lastName || ""}
                  </td>
                  <td>{appt.patientData?.address || "--"}</td>
                  <td>{appt.timeType || "--"}</td>
                  <td>
                    <button
                      className="btn confirm"
                      onClick={() => confirmAppointment(appt)}
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
                <td colSpan="7">Không có lịch khám cho lựa chọn này.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorDashboard;
