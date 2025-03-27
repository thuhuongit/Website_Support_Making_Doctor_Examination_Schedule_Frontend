import { useParams } from "react-router-dom";
import "./Hospital1.css"; // Import file CSS riêng

const HospitalDetail = () => {
  const { id } = useParams();

  const hospitalData = {
    "viet-duc": {
      name: "Bệnh viện Hữu nghị Việt Đức",
      address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
      logo: "/viet-duc.jpg",
      background: "/1.png",
      introduction: `
      Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu cầu, 
      Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám BookingCare.
    `,
    advantages: [
      "Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu kinh nghiệm",
      "Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch)",
      "Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám trước",
      "Nhận được hướng dẫn chi tiết sau khi đặt lịch",
    ],
    process: [
      "Đến cổng số 7, địa chỉ số 16, đường Phủ Doãn, Hàng Bông, Hoàn Kiếm, Hà Nội",
      "Người bệnh đến Quầy cung cấp thông tin tầng 1 nhà H để lấy số ưu tiên.",
      "Báo với nhân viên quầy lấy số là đã đặt lịch trước qua BOOKINGCARE",
      "Nhận phiếu khám, đóng tiền tạm ứng và lên phòng khám tại tầng 4.",
    ],
    },



    "cho-ray": {
      name: "Bệnh viện Chợ Rẫy",
      address: "201B Nguyễn Chí Thanh, Phường 12, Quận 5, TP.HCM",
      logo: "/cho-ray-logo.png",
      background: "/cho-ray-bg.jpg",
    },
  };

  const hospital = hospitalData[id] || hospitalData["viet-duc"];

  return (
    <div className="hospital-container">
      {/* Ảnh nền */}
      <div className="hospital-banner" style={{ backgroundImage: `url(${hospital.background})` }}>
        <div className="hospital-overlay"></div>
      </div>
    

      {/* Nội dung */}
      <div className="hospital-content">
        <div className="hospital-info">
          <img src={hospital.logo} alt={hospital.name} className="hospital-logo" />
          <div>
            <h1 className="hospital-name">{hospital.name}</h1>
            <p className="hospital-address">{hospital.address}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="hospital-tabs">
          {["Giới thiệu", "Thế mạnh chuyên môn", "Trang thiết bị", "Quy trình khám"].map((tab, index) => (
            <button key={index} className="tab-button">
              {tab}
            </button>
          ))}
        </div>
        </div>

        {/* Thông tin bệnh viện */}
        <div className="hospital-introduction">
          <h2>Giới thiệu</h2>
          <p>{hospital.introduction}</p>
          <ul>
            {hospital.advantages.map((adv, index) => (
              <li key={index}>{adv}</li>
            ))}
          </ul>
        </div>

        {/* Quy trình khám */}
        <div className="hospital-process">
          <h2>Quy trình khám</h2>
          <ul>
            {hospital.process.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default HospitalDetail;
