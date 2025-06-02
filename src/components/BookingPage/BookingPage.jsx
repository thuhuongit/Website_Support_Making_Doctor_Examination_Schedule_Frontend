import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import './BookingPage.css';
import axiosInstance from "../../util/axios";

const BookingForm = () => {
  const { doctorId } = useParams();
  const location = useLocation();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
    address: "",
    reason: "",
    gender: "Nam"
  });

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

  useEffect(() => {
    if (!doctorId) return;
    setLoading(true);
    setError(null);

    axiosInstance.get(`http://localhost:8083/api/get-detail-doctor-by-id?id=${doctorId}`)
      .then((res) => {
        if (res.data.errCode === 0 && res.data.data) {
          setDoctor(res.data.data);
        } else {
          setError("Không tìm thấy thông tin bác sĩ");
        }
      })
      .catch((err) => {
        setError("Lỗi khi tải dữ liệu bác sĩ: " + err.message);
      })
      .finally(() => setLoading(false));
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const genderMap = { Nam: 1, Nữ: 0 };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { lastName, firstName, phone, gender } = formData;

    if (!lastName || !firstName || !phone || !gender || !doctorId || !timeType || !date) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    const bookingData = {
      doctorId: doctorId,
      timeType: timeType,
      date: date,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      address: formData.address,
      selectedGender: genderMap[formData.gender],
      reason: formData.reason,
      phone: formData.phone
    };

    console.log("Dữ liệu gửi đi:", bookingData);

    axiosInstance.post('http://localhost:8083/api/patient-book-appointment', bookingData)
      .then(res => {
        console.log("Gửi dữ liệu đặt lịch:", bookingData);
        if (res.data.errCode === 0) {
          alert('Đặt lịch thành công! Email xác nhận đã được gửi.');
        } else {
          alert('Lỗi khi đặt lịch: ' + res.data.errMessage);
        }
      })
      .catch(err => {
        alert('Lỗi hệ thống: ' + err.message);
      });
  };

  if (loading) return <p>Đang tải thông tin bác sĩ...</p>;
  if (error) return <p>Lỗi: {error}</p>;
  if (!doctor) return <p>Không tìm thấy thông tin bác sĩ</p>;

  const info = doctor.Doctor_Infor || {};
  const formattedPrice = info.priceId ? `${info.priceId} VND` : "500.000đ";

  return (
    <div className="booking-container">
      <div className="doctor-info">
        <img
          src={`http://localhost:8083${doctor.image}`}
          alt={`${doctor.lastName} ${doctor.firstName}`}
          className="doctor-image"
          onError={(e) => { e.target.src = '/default-avatar.png'; }}
        />
        <div className="doctor-details">
          <h3>ĐẶT LỊCH KHÁM</h3>
          <p className="doctor-name">{mapIdToPosition(Number(doctor.positionId))} {doctor.lastName} {doctor.firstName}</p>
          <p className="time">🕘 {timeType}</p>
          <p className="date">📅 {date}</p>
          <p className="location">🏥 {info.nameClinic || "Phòng khám chưa cập nhật"}</p>
          <p className="address">{info.addressClinic || doctor.address || "Địa chỉ chưa cập nhật"}</p>
        </div>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <p className="price"
           style={{
               display: 'inline-block',
               padding: '6px 12px',
               border: '1px solid #ccc',
               borderRadius: '6px',
               backgroundColor: '#f9f9f9',
               fontWeight: '600',
               color: '#333',
               marginBottom: '16px'
         }}
        >Giá khám: {formattedPrice}
      </p>


        <div className="name-group">
          <input type="text" placeholder="Họ" name="lastName" value={formData.lastName} onChange={handleChange} />
          <input type="text" placeholder="Tên" name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <input type="text" placeholder="Số điện thoại" name="phone" value={formData.phone} onChange={handleChange} />
        <input type="email" placeholder="Địa chỉ email" name="email" value={formData.email} onChange={handleChange} />
        <input type="text" placeholder="Địa chỉ liên lạc" name="address" value={formData.address} onChange={handleChange} />
        <input type="text" placeholder="Lý do khám" name="reason" value={formData.reason} onChange={handleChange} />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>

        <h4>Hình thức thanh toán</h4>
        <label style={{ display: 'flex', alignItems: 'center', width: '300px' }}>
          <input type="radio" name="paymentMethod" value="after" checked={paymentMethod === "after"} onChange={(e) => setPaymentMethod(e.target.value)} />
          Thanh toán sau tại cơ sở y tế
        </label>

        <div className="summary">
          <p>Giá khám <span>{formattedPrice}</span></p>
          <p>Phí đặt lịch <span>Miễn phí</span></p>
          <p className="total">Tổng cộng <span>{formattedPrice}</span></p>
        </div>

        <div className="note" style={{ color: 'black'}} >
          <strong>LƯU Ý</strong>
          <ul>
            <li>Ghi rõ họ và tên, viết hoa chữ cái đầu. Ví dụ: <b>Nguyễn Văn A</b></li>
            <li>Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"</li>
          </ul>
        </div>

        <button className="confirm-btn" type="submit">Xác nhận đặt khám</button>
        <p className="terms">
          Bằng việc xác nhận, bạn đã đồng ý với <a href="#">Điều khoản sử dụng</a>
        </p>
      </form>
    </div>
  );
};

export default BookingForm;
