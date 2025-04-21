import React from "react";
import "./DoctorSidebar.css";

const DoctorSidebar = () => {
  return (
    <div className="sidebar">
      <div className="profile">
        <img src="./2.png" alt="avatar" className="avatar" />
        <p className="name">Nguyễn Thị Hồng</p>
        <p className="role">DOCTOR</p>
      </div>
      <nav className="nav">
        <ul>
          
          <li className="active">Manage Doctor's Patient</li>
        </ul>
      </nav>
    </div>
  );
};

export default DoctorSidebar;
