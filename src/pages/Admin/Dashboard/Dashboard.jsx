import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

import { useState, useEffect } from "react";
import axiosInstance from "../../../util/axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [newUsersToday, setNewUsersToday] = useState(0);
  const [appointmentsDone, setAppointmentsDone] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [dataDoctors, setDataDoctors] = useState([]);
  const [dataPatients, setDataPatients] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          revenueRes,
          newUserRes,
          appointmentRes,
          doctorRes,
          topDoctorRes,
          vipPatientRes
        ] = await Promise.all([
          axiosInstance.get("http://localhost:8084/api/get-weekly-revenue"),
          axiosInstance.get("http://localhost:8084/api/get-total-new-user-day"),
          axiosInstance.get("http://localhost:8084/api/get-total-health-appointment-done"),
          axiosInstance.get("http://localhost:8084/api/get-total-doctor"),
          axiosInstance.get("http://localhost:8084/api/get-top-three-doctors-of-the-year"),
          axiosInstance.get("http://localhost:8084/api/get-top-four-vip-patient"),
        ]);

        setWeeklyRevenue(revenueRes.data?.total || 0);
        setNewUsersToday(newUserRes.data?.count || 0);
        setAppointmentsDone(appointmentRes.data?.total || 0);
        setTotalDoctors(doctorRes.data?.count || 0);
        setDataDoctors(topDoctorRes.data || []);
        setDataPatients(vipPatientRes.data || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>
            <div style={{
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              borderRadius: '50%',
              marginRight: 5,
            }} />
            <span style={{ fontSize: 14 }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="dashboard">
      <h2>Hi, Welcome back</h2>

      <div className="cards">
        <div className="card green">
          <p>Weekly Revenue</p>
          <h3>${weeklyRevenue.toLocaleString()}</h3>
        </div>
        <div className="card blue">
          <p>New Users</p>
          <h3>{newUsersToday}</h3>
        </div>
        <div className="card yellow">
          <p>Total Health Appointment Done</p>
          <h3>{appointmentsDone}</h3>
        </div>
        <div className="card red">
          <p>Total Doctors</p>
          <h3>{totalDoctors}</h3>
        </div>
      </div>

      <div className="charts">
        <div className="chart-container">
          <h3>Top 3 doctors with the highest revenue of the year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataDoctors}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* Bạn có thể tự động tạo các Bar/Line nếu muốn linh động hơn */}
              <Bar dataKey="CaoKienNguyen" fill="#00C49F" />
              <Bar dataKey="HuynhQuocCuong" fill="#FFBB28" />
              <Line type="monotone" dataKey="TrinTuan" stroke="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Top 4 VIP patients</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPatients}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {dataPatients.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend content={renderCustomLegend} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
