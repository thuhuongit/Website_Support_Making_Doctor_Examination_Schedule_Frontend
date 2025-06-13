import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Cột 1: Thông tin công ty */}
        <div className="footer-column">
          <h3>Công ty Cổ phần Công nghệ BookingCare</h3>
          <p>📍 Lô B4/D21, Khu đô thị mới Hồ Chí Minh</p>
          <p>📜 ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>
          <p>📞 <a href="tel:02473012468">024-7301-2468</a> (7h - 18h)</p>
          <p>📧 <a href="mailto:support@bookingcare.vn">support@bookingcare.vn</a> (7h - 18h)</p>
          <h4>Văn phòng tại TP Hồ Chí Minh</h4>
          <p>📍 Tòa nhà H3, 384 Hoàng Diệu, Phường 6, Quận 4, TP.HCM</p>
          <div className="certifications">
            <img src="/bo-cong-thuong.svg" alt="Đăng ký Bộ Công Thương" />
            <img src="/bo-cong-thuong.svg" alt="Đăng ký Bộ Công Thương" />
          </div>
        </div>

        {/* Cột 2: Liên kết */}
        <div className="footer-column bookingcare">
          <h3>BookingCare</h3>
          <ul>
            <li><a href="#">Liên hệ hợp tác</a></li>
            <li><a href="#">Chuyển đổi số</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
            <li><a href="#">Quy chế hoạt động</a></li>
            <li><a href="#">Tuyển dụng</a></li>
            <li><a href="#">Điều khoản sử dụng</a></li>
            <li><a href="#">Câu hỏi thường gặp</a></li>
            <li><a href="#">Sức khỏe doanh nghiệp</a></li>
          </ul>
        </div>

        {/* Cột 3: Đối tác bảo trợ nội dung */}
        <div className="footer-column ">
          <h3>Đối tác bảo trợ nội dung</h3>
          <div className="partner">
            <img src="/hello.png" alt="Hello Doctor" />
            <p>Hello Doctor - Bảo trợ chuyên mục "Sức khỏe tinh thần"</p>
          </div>
          <div className="partner">
            <img src="/bernard.png" alt="Bernard" />
            <p>Hệ thống y khoa chuyên sâu Bernard - Bảo trợ chuyên mục "Y khoa chuyên sâu"</p>
          </div>
          <div className="partner">
            <img src="/doctor.png" alt="Doctor Check" />
            <p>Doctor Check - Tầm Soát Bệnh Để Sống Thọ Hơn - Bảo trợ chuyên mục "Sức khỏe tổng quát"</p>
          </div>
        </div>
      </div>

      {/* Ứng dụng */}
      <div className="footer-bottom">
        <p>📱 Tải ứng dụng BookingCare trên Android - iPhone/iPad - <a href="#">Khác</a></p>
      </div>

      {/* Nút lên đầu trang */}
      <button className="scroll-to-top">⬆</button>

    </footer>

  );
};

export default Footer;
