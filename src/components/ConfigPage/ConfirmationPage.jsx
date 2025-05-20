import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Dùng useNavigate thay vì window.location.href
import axiosInstance from "../../util/axios";
import { CheckCircle2 } from "lucide-react"; 
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Khai báo navigate
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [status, setStatus] = useState("loading"); // "loading", "success", "error"

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const doctorId = queryParams.get("doctorId");

  useEffect(() => {
    if (token && doctorId) {
      axiosInstance
        .post("http://localhost:8083/api/verify-book-appointment", { token, doctorId })
        .then((response) => {
          if (response.data.errCode === 0) {
            setConfirmationMessage("Đặt lịch khám thành công!");
            setStatus("success");
          } else {
            setConfirmationMessage(response.data.errMessage || "Đặt lịch khám không thành công.");
            setStatus("error");
          }
        })
        .catch((error) => {
          console.error("Error occurred:", error);
          setConfirmationMessage("Đã có lỗi xảy ra, vui lòng thử lại.");
          setStatus("error");
        });
    } else {
      setConfirmationMessage("Thiếu thông tin xác nhận.");
      setStatus("error");
    }
  }, [token, doctorId]);

  if (status === "loading") {
    return <p className="loading">Đang xử lý xác nhận...</p>;
  }

  return (
    <div className="confirmation-page">
      <div className={`confirmation-box ${status}`}>
        <CheckCircle2 size={64} color="#10B981" />
        <h2>{confirmationMessage}</h2>
        <div className="action-buttons">
          <button onClick={() => navigate("/")}>Trang chủ</button> {/* Sử dụng navigate */}
          <button onClick={() => navigate("/")} >Đặt lịch mới</button> {/* Sử dụng navigate */}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
