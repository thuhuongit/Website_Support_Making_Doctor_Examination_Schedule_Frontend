import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login/index";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/system/index"; // Trang muốn chuyển đến
import HomePage from "./Homepages/HomePage";
import HomeHeader from "./Homepages/HomeHeader"
function App() {
  return (
    <Router>  
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/Homepages" element={<HomeHeader />} />

      </Routes>
    </Router>
  );
}

export default App;

