import React, { useEffect, useState } from "react";
import axiosInstance from "../../../util/axios";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [newUsersToday, setNewUsersToday] = useState(0);
  const [appointmentsDone, setAppointmentsDone] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);

  const COLORS = ["#4CAF50", "#FF9800"];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const revenueRes = await axiosInstance.get("/get-weekly-revenue");
        setWeeklyRevenue(revenueRes.data?.data?.totalWeeklyRevenue || 0);

        const userRes = await axiosInstance.get("/get-total-new-user-day");
        setNewUsersToday(userRes.data?.data?.totalNewUserDay || 0);

        const appointmentRes = await axiosInstance.get("/get-total-health-appointment-done");
        setAppointmentsDone(appointmentRes.data?.data?.totalHealthApointmentDone || 0);

        const doctorRes = await axiosInstance.get("/get-total-doctor");
        setTotalDoctors(doctorRes.data?.data?.totalDoctors || 0);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // 👉 Tạo dữ liệu cho biểu đồ
  const userVsDoctorData = [
    { name: "Người dùng mới", value: newUsersToday },
    { name: "Bác sĩ", value: totalDoctors },
  ];

  return (
    <div className="dashboard-container">
      <h2>Hệ thống quản trị tổng quan</h2>

      <div className="summary-cards">
        <div className="card card-green">
          <p>Doanh thu tuần</p>
          <h3>${weeklyRevenue.toLocaleString()}</h3>
        </div>
        <div className="card card-blue">
          <p>Người dùng mới</p>
          <h3>{newUsersToday}</h3>
        </div>
        <div className="card card-yellow">
          <p>Cuộc hẹn đã hoàn thành</p>
          <h3>{appointmentsDone}</h3>
        </div>
        <div className="card card-pink">
          <p>Số bác sĩ</p>
          <h3>{totalDoctors}</h3>
        </div>
      </div>

      <div className="chart-section">
        {/* Biểu đồ cột */}
        <div className="chart-box">
          <h3>So sánh Người dùng mới và Số bác sĩ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userVsDoctorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#2196F3" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ tròn */}
        <div className="chart-box">
          <h3>Tỷ lệ Người dùng mới vs Bác sĩ</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userVsDoctorData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {userVsDoctorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
