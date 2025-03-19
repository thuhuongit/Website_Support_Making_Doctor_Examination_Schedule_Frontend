import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login/index";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/system/index"; // Trang muốn chuyển đến
function App() {
  return (
    <Router>  
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

