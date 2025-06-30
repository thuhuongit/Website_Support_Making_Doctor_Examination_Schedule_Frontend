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

  // Màu sắc tương ứng cho biểu đồ Pie
  const COLORS = ["#4CAF50","#03A9F4", "#FF9800", "#E91E63"];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const revenueRes = await axiosInstance.get("/get-weekly-revenue");
        setWeeklyRevenue(revenueRes.data?.data?.totalWeeklyRevenue || 0);

        const userRes = await axiosInstance.get("/get-total-new-user-day");
        setNewUsersToday(userRes.data?.data?.totalNewUserDay || 0);

        const appointmentRes = await axiosInstance.get("/get-total-health-appointment-done");
        setAppointmentsDone(appointmentRes.data?.data?.totalHealthAppointmentDone || 0);

        const doctorRes = await axiosInstance.get("/get-total-doctor");
        setTotalDoctors(doctorRes.data?.data?.totalDoctors || 0);
      } catch (error) {
        console.error("Dashboard error:", error);
      }
    };

    fetchDashboardData();
  }, []);

  // Dữ liệu cho biểu đồ
  const dashboardChartData = [
    { name: "Doanh thu tuần ($)", value: weeklyRevenue },
    { name: "Người dùng mới", value: newUsersToday },
    { name: "Cuộc hẹn đã hoàn thành", value: appointmentsDone },
    { name: "Bác sĩ", value: totalDoctors },
    
  ];

  return (
    <div className="dashboard-container">
      <h1>Hệ thống quản trị tổng quan</h1>

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
          <h3>So sánh Doanh thu, Người dùng, Bác sĩ và Cuộc hẹn</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardChartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                interval={0}
                height={60}
                tick={({ x, y, payload }) => {
                    const lines = payload.value.split(" ");
                    return (
                      <g transform={`translate(${x},${y + 10})`}>
                         {lines.map((line, index) => (
                           <text
                              key={index}
                              x={0}
                              y={index * 15}
                              textAnchor="middle"
                              fontSize={15}
                              fill="#666"
                           >
                           {line}
                           </text>
                       ))}
                  </g>
              );
         }}
       />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="value" fill="#2196F3" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ tròn */}
        <div className="chart-box">
          <h3>Tỷ lệ Doanh thu - Người dùng - Bác sĩ - Cuộc hẹn</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {dashboardChartData.map((entry, index) => (
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
