import React from 'react';
import './AdminDashboard.css';

const DashboardCard = ({ icon, label, value, color }) => (
  <div className="dashboard-card">
    <div className={`icon ${color}`}>{icon}</div>
    <div>
      <p className="label">{label}</p>
      <p className="value">{value}</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h1 className="sidebar-title">Admin Panel</h1>
        <ul className="menu">
          <li>Dashboard</li>
          <li>Quản lý bác sĩ</li>
          <li>Quản lý người dùng</li>
          <li>Chuyên khoa</li>
          <li>Phòng khám</li>
          <li>Gói khám</li>
          <li>Cài đặt</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h2 className="dashboard-title">Bảng điều khiển</h2>
          <p className="welcome">Xin chào, Admin</p>
        </div>

        <div className="card-grid">
          <DashboardCard icon="🧑" label="Bác sĩ" value="10" color="blue" />
          <DashboardCard icon="🧑‍🤝‍🧑" label="Người dùng" value="250" color="green" />
          <DashboardCard icon="📋" label="Gói khám" value="22" color="yellow" />
          <DashboardCard icon="🏥" label="Phòng khám" value="15" color="red" />
          <DashboardCard icon="✏️" label="Chuyên khoa" value="8" color="purple" />
          <DashboardCard icon="✅" label="Tổng đơn đặt" value="140" color="pink" />
        </div>
      </div>
    </div>
  );
} 
