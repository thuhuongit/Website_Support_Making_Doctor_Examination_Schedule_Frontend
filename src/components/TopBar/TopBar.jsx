import React, { useEffect, useContext } from 'react';
import './TopBar.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const TopBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  // Cập nhật khi load trang
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  const activeToken = sessionStorage.getItem("activeLoginToken");

  if (storedUser && activeToken) {
    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.loginToken === activeToken) {
      setUser(parsedUser); 
    } else {
      setUser(null); 
    }
  } else {
    setUser(null);
  }
}, []);


useEffect(() => {
  const onStorageChange = (e) => {
    if (e.key === 'user') {
      const newUser = e.newValue ? JSON.parse(e.newValue) : null;
      const activeToken = sessionStorage.getItem("activeLoginToken");

      if (newUser?.loginToken === activeToken) {
        setUser(newUser);
      } else {
        setUser(null);
        window.location.href = "/login";
      }
    }
  };

  window.addEventListener("storage", onStorageChange);
  return () => window.removeEventListener("storage", onStorageChange);
}, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("loginToken");
    setUser(null);
    sessionStorage.removeItem("activeLoginToken");
    window.location.href = "/login";
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
              <i className="fa-solid fa-circle-user"></i>
              Xin Chào, {user.lastName} {user.firstName}
            </span>
            <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={handleLogout}>
              <i className="fa-solid fa-right-to-bracket"></i> Đăng xuất
            </span>
          </>
        ) : (
          <>
            <span onClick={() => navigate("/login")}>Đăng nhập</span>
            <span style={{ color: "#fff" }}>|</span>
            <span onClick={() => navigate("/register")}>Đăng ký</span>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;