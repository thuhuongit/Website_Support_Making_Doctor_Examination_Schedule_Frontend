import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./AdminLayout.css";  // Tuỳ chọn: nơi chứa style layout admin

const AdminLayout = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (!user || user.roleId !== '1') {
  //     // Chỉ redirect nếu chưa ở trang login
  //     if (window.location.pathname !== "/login") {
  //       navigate("/login");
  //     }
  //   }
  // }, [navigate]);
  

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet />
        
      </div>
    </div>
  );
};

export default AdminLayout;
