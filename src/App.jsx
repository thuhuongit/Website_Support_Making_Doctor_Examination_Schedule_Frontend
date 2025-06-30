import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Pages
import LoginForm from "./pages/login/login";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import Header from "./pages/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import ChatbotPage from "./components/ChatbotPage/ChatbotPage";
import Hospital from "./components/Hospital/Hospital";
import Doctor from "./components/Doctor/DoctorDetail";
import Book from "./components/Book/Book";
import ConfirmationPage from "./components/ConfigPage/ConfirmationPage";
import SpecialtiesPage from "./components/SpecialtiesPage/SpecialtiesPage";
import Specialty from "./components/Specialty/Specialty";
import HospitalPage from "./components/HospitalPage/HospitalPage";
import BookingPage from "./components/BookingPage/BookingPage";
import DetailSpecialty from "./components/Detail-Specialty/Detail-Specialty";
import DetailHospital from "./components/Detail-Hospital/Detail-Hospital";
import Search from "./components/Search/Search";

// Admin pages
import AdminLayout from "./pages/Admin/layout/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import ManageUser from "./pages/Admin/ManageUser/User";
import ManagePlan from "./pages/Admin/Plan/ManagePlan";
import ManageDoctor from "./pages/Admin/Managedoctor/ManageDoctoe";
import ManageSpecialist from "./pages/Admin/Specialist/Specialist";
import ManageClinic from "./pages/Admin/ManageClinic/ManageClinic";

// Doctor
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";

// ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const { user } = useContext(AuthContext);
  console.log("Current user", user);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/header" element={<Header />} />
          <Route path="/chat" element={<ChatbotPage />} />
          <Route path="/" element={<Navbar />} />
          <Route path="/hospital/:id" element={<Hospital />} />
          <Route path="/hospitals" element={<HospitalPage />} />
          <Route path="/detail-hospitals/:id" element={<DetailHospital />} />
          <Route path="/doctor/:id" element={<Doctor />} />
          <Route path="/dat-kham/:id" element={<Book />} />
          <Route path="/specialties" element={<SpecialtiesPage />} />
          <Route path="/specialty/:id" element={<Specialty />} />
          <Route path="/detail-specialty/:id" element={<DetailSpecialty />} />
          <Route path="/verify-booking" element={<ConfirmationPage />} />
          <Route path="/booking/:doctorId" element={<BookingPage />} />
          <Route path="/search" element={<Search />} />

          {/* Doctor Protected */}
          <Route element={<ProtectedRoute allowedRoles={["2"]} user={user} />}>
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          </Route>

          {/* Admin Protected */}
          <Route element={<ProtectedRoute allowedRoles={["1"]} user={user} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="manageuser" element={<ManageUser />} />
              <Route path="plan" element={<ManagePlan />} />
              <Route path="managedoctor" element={<ManageDoctor />} />
              <Route path="managespecialist" element={<ManageSpecialist />} />
              <Route path="manageclinic" element={<ManageClinic />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
