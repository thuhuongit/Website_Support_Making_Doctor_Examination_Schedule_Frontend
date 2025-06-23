import React, { useState } from "react";
import axiosInstance from "../../util/axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axiosInstance.post("http://localhost:8084/api/login", {
      email,
      password,
    });

    const data = response.data;

    if (data && data.errCode === 0 && data.user) {
      const loginToken = Date.now().toString(); // token duy nhất mỗi lần login
      const fullUser = { ...data.user, loginToken };

      localStorage.setItem("user", JSON.stringify(fullUser));
      sessionStorage.setItem("activeLoginToken", loginToken); // ⬅️ set cho tab hiện tại
      setUser(fullUser);

      switch(data.user.roleId) {
        case "1": navigate("/admin"); break;
        case "2": navigate("/doctor-dashboard"); break;
        default: navigate("/"); break;
      }
    } else {
      alert("Đăng nhập thất bại. Sai email hoặc mật khẩu.");
    }
  } catch (error) {
    alert("Lỗi khi đăng nhập. Vui lòng thử lại sau.");
  }
};


  return (
    <div className="login-wrapper">
      {/* Navbar */}
      <nav className="navbar" style={{ marginTop: '0px'}}>
        <div className="logo" onClick={() => window.location.href = "/"}>
          <img className="logo-img" src="/logo.png" alt="BookingCare" style={{ width: "50px" }} />
          <span className="logo-text">BookingCare</span>
        </div>
        <div className="navbar-right">
          <div className="hotline"><i className="fa-solid fa-phone-volume"></i> Hotline: 024-7301-2468</div>
          <div className="email"><i className="fa-solid fa-envelope"></i> Email: support@bookingcare.vn</div>
          <div className="language-switch">
            <button className="active-lang">🇻🇳</button>
            <button>🇺🇸</button>
          </div>
        </div>
      </nav>

      {/* Login Box */}
      <div className="login-box">
        <div className="form-logo" onClick={() => window.location.href = "/"}>
          <img className="logo-img" src="/logo.png" alt="BookingCare" />
          <span className="logo-text">BookingCare</span>
        </div>

        <h2>Đăng nhập vào BookingCare của bạn</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              <i className={`fa-solid ${showPassword ? "fa-unlock":"fa-lock"} password-toggle`}></i>
            </span>
          </div>

          <div className="forgot-password">
            <a href="#">Quên mật khẩu?</a>
          </div>

          <button type="submit" className="login-btn">Đăng nhập</button>
        </form>

        <div className="login-divider">Hoặc đăng nhập với</div>

        <div className="social-login">
          <button className="facebook-btn"> <i class="fa-brands fa-facebook"></i> Facebook</button>
          <button className="google-btn"> <i class="fa-brands fa-google"></i> Google</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
