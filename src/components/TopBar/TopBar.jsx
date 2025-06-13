import React, { useEffect, useState } from 'react';
import './TopBar.css';
import { FaUserPlus, FaSignInAlt, FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <span>
          <FaMapMarkerAlt /> Địa chỉ: Khu đô thị mới Hồ Chí Minh
        </span>
      </div>

      <div className="top-bar-right">
        {user ? (
          <>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i class="fa-solid fa-circle-user"></i>
              Xin Chào, {user.lastName} {user.firstName} 
            </span>
            <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={handleLogout}>
              <i class="fa-solid fa-right-to-bracket"></i> Đăng xuất
            </span>
          </>
        ) : (
          <>
            <span onClick={() => navigate("/login")}>
              Đăng nhập
            </span>
            <span style={{ color: "#fff" }}>|</span>
            <span onClick={() => navigate("/register")}>
              Đăng ký
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
