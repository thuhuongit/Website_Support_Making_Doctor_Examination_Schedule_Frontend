import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FaSignInAlt } from "react-icons/fa";


const Sidebar = () => {
  const location = useLocation();

  // So sánh trùng khớp tuyệt đối đường dẫn
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar" style={{ backgroundColor: "#ffffff" }}>

      
      {/* Thông tin người dùng */}
      <div className="user-info">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="avatar"
        />
        <div>
          <p>
            <strong>Xin chào, Admin!</strong>
          </p>
          <p className="text-xs text-gray-500">ADMIN</p>
        </div>
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

        {/* --- Nút Login mới thêm --- */}
        <li className={isActive("/login") ? "active" : ""}>
           <Link to="/login">
             <FaSignInAlt style={{ marginRight: "8px" }} />
           </Link>
       </li>

      </ul>
    </div>
  );
};

export default Sidebar;
