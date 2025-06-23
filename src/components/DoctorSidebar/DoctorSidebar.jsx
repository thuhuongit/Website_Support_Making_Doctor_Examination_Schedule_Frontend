import React, { useEffect, useState, useContext } from "react";
import "./DoctorSidebar.css";
import { Link, useLocation } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const DoctorSidebar = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.image && user.image.type === "Buffer" && Array.isArray(user.image.data)) {
        const buffer = new Uint8Array(user.image.data);
        user.image = new TextDecoder().decode(buffer); 
      }
      setDoctorInfo(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loginToken");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">
      <div className="profile">
        {doctorInfo && doctorInfo.image ? (
          <img
            src={
              doctorInfo.image.startsWith("data:image")
                ? doctorInfo.image
                : `http://localhost:8084${doctorInfo.image}`
            }
            alt="Doctor"
            className="avatar"
          />
        ) : (
          <img src="/default-avatar.png" alt="avatar" className="avatar" />
        )}

        <p className="name">
          Xin chào,{" "}
          {doctorInfo
            ? `${doctorInfo.lastName || ""} ${doctorInfo.firstName || ""}`
            : "Loading..."}
        </p>
        <p className="role">DOCTOR</p>
      </div>

      <nav className="nav">
        <ul>
          <li className="active">Manage Doctor's Patient</li>
        </ul>
      </nav>

      <div className="logout">
        <button onClick={handleLogout} className="logout-link">
          <FaSignInAlt /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default DoctorSidebar;
