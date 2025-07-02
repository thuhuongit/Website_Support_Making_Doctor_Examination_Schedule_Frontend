import { useState } from "react";
import "./ChatbotPage.css";
import { useNavigate } from "react-router-dom";

const ChatbotPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="sidebar">
        <div className="logo" onClick={() => navigate("/")} style={{width: '20px'}} >
          <img src="/logo.png" alt="BookingCare" style={{width: '50px'}} />
          <span>BookingCare</span>
        </div>
        <button className="new-chat-btn">+ Cuộc trò chuyện mới</button>
        <div className="chat-history">
          <h4>Lịch sử</h4>
        </div>
        <div className="extra-info">
          <h4>Hiện thêm ▼</h4>
          <p>Thông tin y tế, sức khỏe được cung cấp bởi Trợ lý AI chỉ mang tính tham khảo, không thay thế tư vấn của bác sĩ.</p>
          <a href="#">Quyền riêng tư của bạn</a>
        </div>
      </div>

      {/* Khung chat AI */}
      <div className="chat-area">
        <h2 className="chat-title">Hỏi nhanh, đáp chuẩn - Đặt khám dễ dàng</h2>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Đặt câu hỏi với Trợ lý AI"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend}>➤</button>
        </div>

        {/* Danh sách câu hỏi gợi ý */}
        <div className="suggested-questions">
          {[
            "Thông tin về Khoa Nội Tổng hợp - Bệnh viện Bệnh Nhiệt đới Trung ương",
            "Tôi muốn khám về tuyến vú nên đăng kí khoa nào tại bệnh viện Chợ Rẫy?",
            "Khoa Hậu môn - Trực tràng Bệnh viện Đa khoa Quốc tế Thu Cúc nhận khám bệnh gì?",
            "Cách đặt khám tại phòng khám Bỏng và Tạo hình, Bệnh viện Chợ Rẫy",
            "Nếu phát sinh vấn đề trong quá trình đi khám tại Bệnh viện Ung bướu Hưng Việt thì liên hệ ai?",
            "Đăng ký khám trực tiếp tại Bệnh viện Đa khoa Quốc tế Thu Cúc có lâu không?"
          ].map((question, index) => (
            <div key={index} className="question">
              {question} +
            </div>
          ))}
        </div>

        {/* Khung chat AI */}
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <p>
            - Trợ lý sức khỏe với AI hỗ trợ tìm kiếm các thông tin bệnh viện top đầu như: Bệnh viện Chợ Rẫy, Bệnh viện Việt Đức...
          </p>
          <p>
            - Cơ sở y tế bạn lựa chọn không thuộc phạm vi hỗ trợ của Trợ lý AI. Thông tin có thể không chính xác.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
