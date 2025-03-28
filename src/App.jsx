import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login/index";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/system/index";
import Navbar from "./components/Navbar/Navbar";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import ChatbotPage from "./components/ChatbotPage/ChatbotPage";
import Hospital from "./components/Hospital/Hospital"





function App() {
  return (
    <I18nextProvider i18n={i18n}> {/* Thêm Provider để hỗ trợ i18n */}
      <Router>
        <ToastContainer autoClose={3000} />
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/" element={<Navbar />} />
          <Route path="/hospital/:id" element={<Hospital/>} />
          
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
