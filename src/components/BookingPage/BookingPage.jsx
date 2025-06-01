import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import './BookingPage.css';
import axiosInstance from "../../util/axios";

const BookingForm = () => {
  const { doctorId } = useParams();
  const location = useLocation();

  // State bác sĩ
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State form
  const [patientFor, setPatientFor] = useState("self");
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("after");

  const searchParams = new URLSearchParams(location.search);
  const timeType = decodeURIComponent(searchParams.get('timeType') || '');
  const date = searchParams.get('date') || '';
  const positionMap = {
    1: 'Bác sĩ',
    2: 'Tiến sĩ',
    3: 'Thạc sĩ',
    4: 'Phó giáo sư',
    5: 'Giáo sư',
  };
  
  const mapIdToPosition = (id) => positionMap[id] || '';  

  // Gọi API lấy thông tin bác sĩ
  useEffect(() => {
    if (!doctorId) return;
  
    setLoading(true);
    setError(null);
  
    axiosInstance.get(`http://localhost:8083/api/get-detail-doctor-by-id?id=${doctorId}`)
      .then((res) => {
        console.log("API response doctor detail:", res.data);
        if(res.data.errCode === 0 && res.data.data){
          setDoctor(res.data.data);
        } else {
          setError("Không tìm thấy thông tin bác sĩ");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [doctorId]);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      patientFor,
      patientName,
      gender,
      phone,
      email,
      birthYear,
      province,
      district,
      address,
      reason,
      paymentMethod,
      doctorId,
      timeType,
      date,
    };

    console.log("Dữ liệu đặt lịch:", bookingData);
    // TODO: Gửi bookingData lên server
  };

  if (loading) return <p>Đang tải thông tin bác sĩ...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!doctor) return <p>Không tìm thấy thông tin bác sĩ</p>;

  // Lấy thông tin Doctor_Infor nếu có
  const info = doctor.Doctor_Infor || {};

  return (
    <div className="booking-container">

<div className="doctor-info">
    <img
      src={`http://localhost:8083${doctor.image}`}
      alt={`${doctor.lastName} ${doctor.firstName}`}
      className="doctor-image"
      onError={(e) => { e.target.onerror = null; e.target.src = '/default-avatar.png'; }}
    />
    <div className="doctor-details">
      <h3>ĐẶT LỊCH KHÁM</h3>
      <p className="doctor-name">{mapIdToPosition(Number(doctor.positionId))} {doctor.lastName} {doctor.firstName}</p>
      <p className="time">🕘 {timeType}</p>
      <p className="date">📅 {date}</p>
      <p className="location">🏥 {doctor.Doctor_Infor?.nameClinic || "Phòng khám chưa cập nhật"}</p>
      <p className="address">{doctor.Doctor_Infor?.addressClinic || doctor.address || "Địa chỉ chưa cập nhật"}</p>
    </div>
  </div>

      <form className="booking-form" onSubmit={handleSubmit}>
      <p className="price">Giá khám: {doctor.Doctor_Infor?.priceId || "Chưa cập nhật"} </p>


        <div className="radio-group">
          
          <label>
            <input
              type="radio"
              name="patientFor"
              value="self"
              checked={patientFor === "self"}
              onChange={() => setPatientFor("self")}
            />
            Đặt cho mình
          </label>
          <label>
            <input
              type="radio"
              name="patientFor"
              value="relative"
              checked={patientFor === "relative"}
              onChange={() => setPatientFor("relative")}
            />
            Đặt cho người thân
          </label>
        </div>

        <input
          type="text"
          placeholder="Họ tên bệnh nhân (bắt buộc)"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />

        <div className="gender-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Nam"
              checked={gender === "Nam"}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            Nam
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Nữ"
              checked={gender === "Nữ"}
              onChange={(e) => setGender(e.target.value)}
            />
            Nữ
          </label>
        </div>

        <input
          type="tel"
          placeholder="Số điện thoại liên hệ (bắt buộc)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Địa chỉ email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Năm sinh (bắt buộc)"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          required
        />

        <select
          value={province}
          onChange={(e) => setProvince(e.target.value)}
          required
        >
          <option value="">-- Chọn Tỉnh/Thành --</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="Hồ Chí Minh">Hồ Chí Minh</option>
        </select>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
        >
          <option value="">-- Chọn Quận/Huyện --</option>
          <option value="Đống Đa">Đống Đa</option>
          <option value="Ba Đình">Ba Đình</option>
        </select>

        <input
          type="text"
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <textarea
          placeholder="Lý do khám"
          rows="3"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>

        <h4>Hình thức thanh toán</h4>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="after"
            checked={paymentMethod === "after"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />Thanh toán sau tại cơ sở y tế
        </label>

        <div className="summary">
          <p>Giá khám <span>{info.priceId ? info.priceId + " VND" : "500.000đ"}</span></p>
          <p>Phí đặt lịch <span>Miễn phí</span></p>
          <p className="total">Tổng cộng <span>{info.priceId ? info.priceId + " VND" : "500.000đ"}</span></p>
        </div>

        <div className="note">
          <strong>LƯU Ý</strong>
          <ul>
            <li>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: <b>Trần Văn Phú</b></li>
            <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi "Xác nhận"</li>
          </ul>
        </div>

        <button className="confirm-btn" type="submit">Xác nhận đặt khám</button>
        <p className="terms">
          Bằng việc xác nhận đặt khám, bạn đã hoàn toàn đồng ý với <a href="#">Điều khoản sử dụng</a>
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
