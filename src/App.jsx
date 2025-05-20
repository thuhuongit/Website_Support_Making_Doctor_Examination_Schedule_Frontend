import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/login/index";
import { ToastContainer } from "react-toastify";
import Header from "./pages/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import ChatbotPage from "./components/ChatbotPage/ChatbotPage";
import Hospital from "./components/Hospital/Hospital";
import Doctor from "./components/Doctor/DoctorDetail";
import Book from "./components/Book/Book"


import AdminLayout from "./pages/Admin/layout/AdminLayout";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import ConfirmationPage from "./components/ConfigPage/ConfirmationPage";
import ManagePlan from "./pages/Admin/Plan/ManagePlan";
import ManageDoctor from "./pages/Admin/Managedoctor/ManageDoctoe";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ManageSpecialist from "./pages/Admin/Specialist/Specialist"; 
import SpecialtiesPage from "./components/SpecialtiesPage/SpecialtiesPage";
import ManageUser from "./pages/Admin/ManageUser/User";






function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <I18nextProvider i18n={i18n}> 
      <Router>
        <ToastContainer autoClose={3000} />


        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/header" element={<Header />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/" element={<Navbar />} />
          <Route path="/hospital/:id" element={<Hospital/>} />
          <Route path="/doctor/:id" element={<Doctor/>} />
          <Route path="/dat-kham/:id" element={<Book/>} />
          <Route path="/doctor-dashboard"element={<DoctorDashboard />}/>
          <Route path="/verify-booking" element={<ConfirmationPage />} />
          <Route path="/specialties" element={<SpecialtiesPage />} />


          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          
      
             <Route path="manageuser" element={<ManageUser />} />
             <Route path="plan" element={<ManagePlan />} />
             <Route path="managedoctor" element={<ManageDoctor />} />
             <Route path="managespecialist" element={<ManageSpecialist />} />

             
          </Route>
         







          
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
