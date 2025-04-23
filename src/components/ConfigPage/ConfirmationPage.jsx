import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../util/axios";
import { CheckCircle2 } from "lucide-react"; 
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  const location = useLocation();
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [status, setStatus] = useState("loading"); // "loading", "success"

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const doctorId = queryParams.get("doctorId");

  useEffect(() => {
    if (token && doctorId) {
      axiosInstance
        .post("/api/verify-book-appointment", { token, doctorId })
        .then((response) => {
          if (response.data.errCode === 0) {
            setConfirmationMessage("Đặt lịch khám thành công!");
            setStatus("success");
          } else {
            
            setConfirmationMessage("Đặt lịch khám không thành công.");
            setStatus("success"); 
          }
        })
        .catch(() => {
          
          setConfirmationMessage(""); 
          setStatus("success"); 
        });
    } else {
      setConfirmationMessage("Thiếu thông tin xác nhận.");
      setStatus("success"); 
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
          <button onClick={() => window.location.href = "/"}>Trang chủ</button>
          <button onClick={() => window.location.href = "/"}>Đặt lịch mới</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
