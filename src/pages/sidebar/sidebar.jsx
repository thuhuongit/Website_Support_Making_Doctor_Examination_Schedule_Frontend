import { useState } from "react";
import "./sidebar.css";
import { useNavigate } from "react-router-dom"; 
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import UserRedux from "../../System/Admin/UserRedux";

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý khi click ra ngoài dropdown
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".menu-item")) {
      setMenuOpen(false);
    }
  };

  // Lắng nghe sự kiện click trên toàn trang
  document.addEventListener("click", handleOutsideClick);

  return (
    <div className="container">
      <div className="sidebar">
        {/* Nút Hệ thống */}
        <div className="menu-item" onClick={(e) => { 
          e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
          setMenuOpen(!menuOpen);
        }}>
          Người dùng
          <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
            <ul>
              <li><a href="#">Quản trị hệ thống</a></li>
              
            </ul>
          </div>
        </div>

        <div className="menu-item" onClick={(e) => { 
          e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
          setMenuOpen(!menuOpen);
        }}>
          Phòng khám
          <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
            <ul>
              <li><a href="#">Quản trị hệ thống</a></li>
              
            </ul>
          </div>
        </div>


        <div className="menu-item" onClick={(e) => { 
          e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
          setMenuOpen(!menuOpen);
        }}>
          Chuyên khoa 
          <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
            <ul>
              <li><a href="#">Quản trị hệ thống</a></li>
              
            </ul>
          </div>
        </div>


        <div className="menu-item" onClick={(e) => { 
          e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
          setMenuOpen(!menuOpen);
        }}>
          Cẩm nang
          <div className={`dropdown-menu ${menuOpen ? "show" : ""}`}>
            <ul>
              <li><a href="#">Quản trị hệ thống</a></li>
              
            </ul>
          </div>
        </div>




        <div className="login-btn" onClick={() => navigate("/login")}>
          <i className="fa-solid fa-right-to-bracket"></i>
        </div>
      
      </div>
      <UserRedux/>

    </div>
  );
};

export default Sidebar;
