import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const API_URL = "http://localhost:8081/api/login";
const LoginForm = () => {
  const [email, setEmail] = useState("sa@gmail.com");
  const [password, setPassword] = useState("1");
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate(); // Hook điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login API response:", data);

      if (data.errCode == 0) {
        toast.success("Đăng nhập thành công!", { position: "top-right" });

       // Chờ 1 giây để Toast hiển thị rồi chuyển trang
        setTimeout(() => {
           navigate("/");
         }, 1000);
      } else {
        toast.error("Sai email hoặc mật khẩu!", { position: "top-right" });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("⚠ Lỗi kết nối đến server!", { position: "top-right" });
    }
  };
  
  

  return (
    <div className="login-container z-50">
      {/* Thêm ToastContainer để đảm bảo Toast hoạt động */}
      <ToastContainer autoClose={3000} />

      <div className="login-box">
        <div className="text-center text-white">
          <span className="text-sm">Have an account?</span>
          <h1 className="text-3xl font-semibold">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="input-group">
            <input
              type="email"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bx-user input-icon"></i>
          </div>
          <div className="input-group">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="bx bx-lock-alt input-icon"></i>
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
        <div className="login-footer">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
