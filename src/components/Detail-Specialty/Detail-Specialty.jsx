import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Detail-Specialty.css';
import Footer from '../Footer/Footer';
import axiosInstance from '../../util/axios';

const provinceMap = {
  hanoi: "Hà Nội",
  hochiminh: "Hồ Chí Minh",
  danang: "Đà Nẵng",
  lamdong: "Lâm Đồng",
  haiPhong: "Hải Phòng",
  haiDuong: "Hải Dương",
  quangNinh: "Quảng Ninh",
  bacNinh: "Bắc Ninh",
  thanhHoa: "Thanh Hóa",
  nghean: "Nghệ An",
  tiengiang: "Tiền Giang",
  
};

const Specialty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [detail, setDetail] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [schedules, setSchedules] = useState({});
  const [selectedDates, setSelectedDates] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Lấy chuyên khoa và bác sĩ
  useEffect(() => {
    const fetchSpecialtyAndDoctors = async () => {
      try {
        const res = await axiosInstance.get('http://localhost:8084/api/get-detail-specialty-by-id', {
          params: { id, location: 'ALL' },
        });
        if (res.data.errCode === 0) {
          setDetail(res.data.data || {});
          const doctorIds = res.data.data.doctorSpecialty?.map(item => item.doctorId) || [];
          const doctorPromises = doctorIds.map(doctorId =>
            axiosInstance.get('http://localhost:8084/api/get-detail-doctor-by-id', {
              params: { id: doctorId },
            })
          );
          const responses = await Promise.all(doctorPromises);
          const validDoctors = responses
            .filter(r => r.data.errCode === 0)
            .map(r => r.data.data);
          setDoctors(validDoctors);

          const today = new Date().toISOString().split('T')[0];
          const initialDates = {};
          validDoctors.forEach(d => {
            initialDates[d.id] = today;
          });
          setSelectedDates(initialDates);
        }
      } catch (error) {
        console.error('Lỗi khi lấy chuyên khoa hoặc bác sĩ:', error);
        setDetail({});
        setDoctors([]);
      }
    };

    if (id) fetchSpecialtyAndDoctors();
  }, [id]);

  // Lấy lịch khám
  useEffect(() => {
    const fetchSchedules = async () => {
      if (!doctors.length) return;

      try {
        const schedulePromises = doctors.map(doc => {
          const date = selectedDates[doc.id];
          if (!date) return Promise.resolve({ data: { errCode: 1 } });
          return axiosInstance.get('http://localhost:8084/api/get-schedule-doctor-by-date', {
            params: { doctorId: doc.id, date },
          });
        });

        const responses = await Promise.all(schedulePromises);
        const scheduleMap = {};
        responses.forEach((res, idx) => {
          const doctorId = doctors[idx].id;
          scheduleMap[doctorId] = res.data.errCode === 0 ? res.data.data || [] : [];
        });

        setSchedules(scheduleMap);
      } catch (error) {
        console.error('Lỗi khi lấy lịch khám:', error);
        setSchedules({});
      }
    };

    fetchSchedules();
  }, [doctors, selectedDates]);

  const renderSchedule = (doctorId) => {
    const doctorSchedules = schedules[doctorId] || [];
  
    if (doctorSchedules.length === 0) {
      return <p>{t('Chưa có lịch khám cho ngày này.')}</p>;
    }
  
    return (
      <div className="time-slot-grid">
        {doctorSchedules.map((slot) => {
          const isAvailable = slot.maxNumber > 0;
          const isSelected = selectedSlot?.timeType === slot.timeType && selectedDoctor?.id === doctorId;
  
          return (
            <button
              key={slot.id || slot.timeType}
              className={`time-slot ${isAvailable ? "available" : "full"} ${isSelected ? "selected" : ""}`}
              disabled={!isAvailable}
              onClick={() => {
                if (isAvailable) {
                  const doctor = doctors.find(d => d.id === doctorId);
                  setSelectedDoctor(doctor);
                  setSelectedSlot(slot);
                  setBookingSuccess(false);
              
                  navigate(`/booking/${doctorId}?timeType=${encodeURIComponent(slot.timeType)}&date=${selectedDates[doctorId]}`);
                }
              }}
            >
              {slot.timeType}
            </button>
          );
        })}
      </div>
    );
  };
  

  return (
    <div className="specialty-container">
      {/* Navbar */}
      <nav className="navbar" style={{ marginTop: '0px'}}>
        <div className="logo" onClick={() => navigate('/')}>
          <img className="logo-img" src="/logo.png" alt="BookingCare" style={{width: '50px'}} />
          <span className="logo-text">BookingCare</span>
        </div>
        <ul className="nav-links">
          <li>{t('Chuyên khoa')}<br /><span>{t('Tìm bác sĩ theo chuyên khoa')}</span></li>
          <li>{t('Cơ sở y tế')}<br /><span>{t('Chọn bệnh viện phòng khám')}</span></li>
          <li>{t('Bác sĩ')}<br /><span>{t('Chọn bác sĩ giỏi')}</span></li>
          <li>{t('Gói khám')}<br /><span>{t('Khám sức khỏe tổng quát')}</span></li>
        </ul>
      </nav>

      {/* Thông tin chuyên khoa */}
      <div className="specialty-detail-box">
        <h2 className="title">{detail.name || t('Tên chuyên khoa')}</h2>
        <p className="sub-title">{t(`Chuyên khoa ${detail.name || 'chuyên khoa'}`)}</p>
        {detail.descriptionHTML && (
          <div
            className="description-html"
            dangerouslySetInnerHTML={{ __html: detail.descriptionHTML }}
          />
        )}
      </div>

      {/* Danh sách bác sĩ */}
      {doctors.length > 0 ? (
        doctors.map((doctor) => {
          console.log(doctors);
          const selectedDate = selectedDates[doctor.id] || new Date().toISOString().split('T')[0];
          const provinceKey = doctor.Doctor_Infor?.provinceId?.toLowerCase().replace(/\s+/g, '') || '';
          const provinceName = provinceMap[provinceKey] || doctor.Doctor_Infor?.provinceId || 'Chưa cập nhật vị trí';


          return (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-header">
                <img
                  src={`http://localhost:8084${doctor.image}`}
                  alt={`${doctor.lastName} ${doctor.firstName} `}
                  className="doctor-image"
                />
                <div className="doctor-info">
                  <h2 className="doctor-name">
                     <span className="favorite-icon">❤️ Yêu thích</span>{' '}
                     {doctor.positionData?.valueVi} {doctor.lastName} {doctor.firstName}
                  </h2>

                <div className="doctor-description"
                  dangerouslySetInnerHTML={{__html: doctor.Markdown?.description || `<p>${t('Chưa có giới thiệu')}</p>`,
                }}
                />
                <div className="doctor-location">
                  <i className="fa-solid fa-location-dot" style={{ marginRight: '6px' }}></i>
                  {doctor.Doctor_Infor?.provinceId 
                    ? `${provinceMap[doctor.Doctor_Infor.provinceId.toLowerCase()] || doctor.Doctor_Infor.provinceId}`
                    : 'Chưa cập nhật vị trí'}
                </div>
            </div>
              </div>

              {/* Lịch khám */}
              <div className="doctor-schedule" style={{ width: '40%' }}>
                <h4>{t('Lịch khám')}:</h4>
                <div>
                  <label htmlFor={`date-${doctor.id}`}>{t('Chọn ngày')}: </label>
                  <input
                    id={`date-${doctor.id}`}
                    type="date"
                    value={selectedDate}
                    onChange={(e) =>
                      setSelectedDates((prev) => ({ ...prev, [doctor.id]: e.target.value }))
                    }
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                {renderSchedule(doctor.id)}
                <div className="note">{t('Chọn giờ và đặt (miễn phí)')}</div>

                {/* Thông tin phòng khám */}
                <div className="clinic-info-horizontal">
                  <div><strong>{t('Phòng khám')}:</strong> {doctor.Doctor_Infor?.nameClinic || t('Chưa cập nhật')}</div>
                  <div><strong>{t('Địa chỉ')}:</strong> {doctor.Doctor_Infor?.addressClinic || t('Chưa cập nhật')}</div>
                  <div><strong>{t('Giá khám')}:</strong> {doctor.Doctor_Infor?.priceId || t('Chưa cập nhật')} VND</div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>{t('Đang tải thông tin bác sĩ...')}</p>
      )}
      <Footer />
    </div>
  );
};

export default Specialty;
