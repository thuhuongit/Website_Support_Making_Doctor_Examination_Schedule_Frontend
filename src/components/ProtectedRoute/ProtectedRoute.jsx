// components/ProtectedRoute/ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [], redirectPath = "/login", user }) => {
  if (!user || !allowedRoles.includes(user.roleId)) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
