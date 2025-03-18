import { useState } from "react";
import "../index.css"; // Import file CSS chung

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with", { username, password, rememberMe });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="text-center text-white">
          <span className="text-sm">Have an account?</span>
          <h1 className="text-3xl font-semibold">Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
