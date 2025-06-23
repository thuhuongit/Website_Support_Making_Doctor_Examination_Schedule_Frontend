import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import "./Sidebar.css";
import { FaSignInAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext"; // nhớ import context

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState(null);
  const { setUser } = useContext(AuthContext); // lấy setUser từ context

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.image && user.image.type === "Buffer" && Array.isArray(user.image.data)) {
        const buffer = new Uint8Array(user.image.data);
        user.image = new TextDecoder().decode(buffer); 
      }
      user.fullName = `${user.lastName?.trim() || ""} ${user.firstName?.trim() || ""}`;
      setAdminInfo(user);
    }
  }, []);

  const handleLogout = () => {
     localStorage.removeItem("user");
     localStorage.removeItem("loginToken");
     setUser(null);
     window.location.href = "/login";
};


  return (
    <div className="sidebar" style={{ backgroundColor: "#ffffff" }}>
      {/* Thông tin người dùng */}
      <div className="user-info">
        <img
          src={
            adminInfo?.image?.startsWith("data:image")
              ? adminInfo.image
              : adminInfo?.image
              ? `http://localhost:8084${adminInfo.image}`
              : "/default-avatar.png"
          }
          alt="Admin"
          className="avatar"
        />
        <p className="name">
          Xin chào, {adminInfo ? adminInfo.fullName : "Loading..."}
        </p>
        <p className="role">ADMIN</p>
      </div>

      {/* Danh mục điều hướng */}
      <ul>
        <li className={isActive("/admin") ? "active" : ""}>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li className={isActive("/admin/manageuser") ? "active" : ""}>
          <Link to="/admin/manageuser">Manage Users</Link>
        </li>
        <li className={isActive("/admin/managedoctor") ? "active" : ""}>
          <Link to="/admin/managedoctor">Manage Doctor</Link>
        </li>
        <li className={isActive("/admin/plan") ? "active" : ""}>
          <Link to="/admin/plan">Manage Health Exam Plan</Link>
        </li>
        <li className={isActive("/admin/managespecialist") ? "active" : ""}>
          <Link to="/admin/managespecialist">Manage Specialist</Link>
        </li>
        <li className={isActive("/admin/manageclinic") ? "active" : ""}>
          <Link to="/admin/manageclinic">Manage Clinic</Link>
        </li>
      </ul>

      {/* Đăng xuất */}
      <div className="logout">
        <button onClick={handleLogout} className="logout-link">
          <FaSignInAlt /> Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
