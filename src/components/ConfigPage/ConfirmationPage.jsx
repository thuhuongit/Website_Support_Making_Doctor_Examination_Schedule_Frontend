import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../util/axios";
import { CheckCircle2 } from "lucide-react"; // icon
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
            // Chỉ hiển thị thành công, không xử lý lỗi
            setConfirmationMessage("Đặt lịch khám không thành công.");
            setStatus("success"); // Lý do: bạn muốn chỉ hiển thị "thành công"
          }
        })
        .catch(() => {
          // Không làm gì cả khi có lỗi
          setConfirmationMessage(""); // Hoặc bạn có thể để trống
          setStatus("success"); // Để nó hiển thị như thành công
        });
    } else {
      setConfirmationMessage("Thiếu thông tin xác nhận.");
      setStatus("success"); // Hiển thị như là thành công
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
