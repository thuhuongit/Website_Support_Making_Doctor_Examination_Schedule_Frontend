import { useParams } from "react-router-dom";
import "./Hospital.css"; 
import Footer from "../Footer/Footer";


const HospitalDetail = () => {
  const { id } = useParams();

  const hospitalData = {
    "viet-duc": {
      name: "Bệnh viện Hữu nghị Việt Đức",
      address: "Nhà H, Tầng 1, số 16 Phủ Doãn, Phường Hàng Bông, Quận Hoàn Kiếm, Hà Nội",
      logo: "/viet-duc.jpg",
      background: "/1.png",

      introduction: `
      "Địa chỉ: Bệnh viện có nhiều cổng, bệnh nhân đến khám sẽ đến cổng:",
      "Số 16 Phủ Doãn, Hàng Bông, Hoàn Kiếm, Hà Nội",
      "Thời gian làm việc: Thứ 2 đến thứ 7",
      "Sáng: 7h00 - 12h00",
      "Chiều: 13h30 - 16h30",
      "Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước.",
      "Việt Đức là địa chỉ uy tín hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân.",
      "Lưu ý quan trọng",
      "Bệnh viện có nhiều khu khám bệnh, hiện tại BookingCare đang hỗ trợ đăng ký khám tại tòa nhà C4 - Khoa khám bệnh theo yêu cầu. Người bệnh đến khám đúng tòa nhà C4 để được hỗ trợ.",
      "Bệnh viện chuyên về Ngoại khoa nên lịch của các bác sĩ thường linh động và ưu tiên khám cho các ca cấp cứu.",
      "Mỗi bệnh nhân trong ngày chỉ được đặt trước 1 chuyên khoa, nếu đăng kí 2 chuyên khoa trở lên sẽ trao đổi bác sĩ thăm khám ban đầu chuyển khám thêm khoa khác.",
      "Chi phí khám",
      "Người bệnh có thể lựa chọn một trong các gói khám sau:",
      "1. Gói 1:", 
      "Khám Giáo sư, Phó Giáo sư, Tiến sĩ, Bác sĩ Chuyên khoa II - Chi phí 500.000 đồng/lần khám",
      "Khám với bác sĩ Trưởng khoa hoặc Phó khoa - Chi phí 500.000 đồng/lần khám",
      "2. Gói 2:",
      "Khám Thạc sĩ, Bác sĩ Chuyên khoa I - Chi phí: 300.000 đồng/lần khám",
     
    `,
    advantages: [
      "Địa chỉ: Bệnh viện có nhiều cổng, bệnh nhân đến khám sẽ đến cổng:",
      "Số 16 Phủ Doãn, Hàng Bông, Hoàn Kiếm, Hà Nội",
      "Thời gian làm việc: Thứ 2 đến thứ 7",
      "Sáng: 7h00 - 12h00",
      "Chiều: 13h30 - 16h30",
      "Bệnh viện Việt Đức là một trong 5 bệnh viện tuyến Trung ương, hạng đặc biệt của Việt Nam. Bệnh viện có lịch sử trên 100 năm, bề dày truyền thống danh tiếng, là cái nôi của ngành ngoại khoa Việt Nam gắn liền với những thành tựu Y học quan trọng của đất nước.",
      "Việt Đức là địa chỉ uy tín hàng đầu về ngoại khoa, tiến hành khám bệnh, chữa bệnh và thực hiện các kỹ thuật chụp chiếu, xét nghiệm, thăm dò chức năng cơ bản và chuyên sâu hàng ngày cho người dân.",
      "Lưu ý quan trọng",
      "Bệnh viện có nhiều khu khám bệnh, hiện tại BookingCare đang hỗ trợ đăng ký khám tại tòa nhà C4 - Khoa khám bệnh theo yêu cầu. Người bệnh đến khám đúng tòa nhà C4 để được hỗ trợ.",
      "Bệnh viện chuyên về Ngoại khoa nên lịch của các bác sĩ thường linh động và ưu tiên khám cho các ca cấp cứu.",
      "Mỗi bệnh nhân trong ngày chỉ được đặt trước 1 chuyên khoa, nếu đăng kí 2 chuyên khoa trở lên sẽ trao đổi bác sĩ thăm khám ban đầu chuyển khám thêm khoa khác.",
      "Chi phí khám",
      "Người bệnh có thể lựa chọn một trong các gói khám sau:",
      "1. Gói 1:", 
      "Khám Giáo sư, Phó Giáo sư, Tiến sĩ, Bác sĩ Chuyên khoa II - Chi phí 500.000 đồng/lần khám",
      "Khám với bác sĩ Trưởng khoa hoặc Phó khoa - Chi phí 500.000 đồng/lần khám",
      "2. Gói 2:",
      "Khám Thạc sĩ, Bác sĩ Chuyên khoa I - Chi phí: 300.000 đồng/lần khám",

    ],
    process: [
      "Bệnh viện Việt Đức là bệnh viện chuyên khoa Ngoại (phẫu thuật), có thế mạnh về khám, điều trị và Phẫu thuật nhiều chuyên khoa. Một số thế mạnh của Bệnh viện Việt Đức là:",
      "Khám, điều trị, phẫu thuật về Thần kinh (Thần kinh I, Thần kinh II): Chấn thương; Bệnh lý sọ não; Tuỷ sống; Dây thần kinh ngoại vi; Ứng dụng nội soi trong phẫu thuật thần kinh; Phẫu thuật thần kinh chức năng; Phẫu thuật u nền sọ;...",
      "Khám, điều trị, phẫu thuật về Cơ xương khớp:",
      "Khám, điều trị, phẫu thuật về Chi trên và Y học thể thao: Khám các bệnh lý do chấn thương thể thao; Bệnh lý đứt dây chằng gối do chơi thể thao; Chấn thương chỉnh hình xương khớp; Phẫu thuật bàn tay; Bệnh lý cơ xương khớp về tay;...",
      "Khám, điều trị, phẫu thuật về Chi dưới: Điều trị thoái hóa khớp gối, khớp háng; Bệnh lý đứt dây chằng gối; Phẫu thuật khớp gối, khớp háng, khớp cổ chân; Bệnh lý về chân;...",
      "Khám, điều trị, phẫu thuật về Xương và điều trị ngoại trú: Nắn chỉnh về xương, tai nạn bị gãy tay gãy chân, tháo bột, kiểm tra lại sau khi nắn chỉnh về xương.",
      "Khám, điều trị, phẫu thuật về chấn thương chung: tháo đinh, kiếm tra lại sau mổ,...", 
      "Khám, điều trị, phẫu thuật về Cột sống: Bệnh lý cột sống; Đau vai gáy; Thoái hoá và thoát vị đĩa đệm; Chấn thương chỉnh hình cột sống; Trượt đốt sống; Vẹo cột sống; Bơm xi-măng vào thân đốt sống;...",
      "Khám, điều trị, phẫu thuật về Tim mạch và lồng ngực: Khám và điều trị bệnh lý tim bẩm sinh trẻ em; Khám và điều trị các bệnh lý nội, ngoại khoa về tim mạch; Điều trị các bệnh lý phức tạp về động - tĩnh mạch bằng các phương pháp tiên tiến; Các bệnh lý về xương sườn;...",
      "Khám, điều trị, phẫu thuật về Tạo hình-Hàm mặt-Thẩm mỹ: Bệnh lý và chấn thương vùng hàm mặt; Phục hồi tái tạo các cơ quan sau điều trị ung thư; Sửa chữa các dị tật sọ mặt; Nối vành tai đứt rời, mũi đứt rời ; Phẫu thuật thẩm mĩ mi mắt, mũi, tạo hình ngực, bụng….",
      "Khám, điều trị, phẫu thuật về Tiêu hóa: Cắt bỏ và tạo hình thực quản; Cắt khối tá tuỵ; Cắt toàn bộ dạ dày, cắt đại tràng các loại.",
      "Ngoài ra, bệnh viện khám, điều trị, phâu thuật các chuyên khoa khác như:",
      "Bệnh lý thần kinh",
      "Nội-Hồi sức thần kinh",
      "Bệnh tim mạch và lồng ngực",
      "Ngọai nhi và trẻ sơ sinh",
      "Bệnh lý tiêu hóa",
      "Phẫu thuật tiêu hóa",
      "Bệnh cột sống/thoát vị đĩa đệm",
      "Chi trên và y học  thể thao",
      "Bệnh lý chi dưới",
      "Khám xương và điều trị ngoại trú",
      "Phẫu thuật chấn thương chung", 
      "Phẫu thuật tạo hình - hàm mặt - thẩm mỹ",
      "Phục hồi chức năng",
      "Nhiễm khuẩn",
      "Phẫu thuật nhiễm khuẩn",
      "Bệnh đường tiết niệu",
    ],
    equipment: {
      description: "Bệnh viện Việt Đức được trang bị hầu hết các trang thiết bị hiện đại hàng đầu hiện nay phục vụ trong chẩn đoán và thực hiện các xét nghiệm kỹ thuật cao.",
      machines: [
        "Xquang số hóa",
        "Máy siêu âm",
        "Máy chụp cắt lớp vi tính đa dãy CT Scan",
        "Máy chụp cộng hưởng từ MRI 3.0 Tesla",
        "Hệ thống chụp mạch máy chuyên dụng",
        "Hệ thống PET/CT phát hiện ung thư sớm và đánh giá các bệnh lý tim mạch, thần kinh",
        "Hệ thống máy sinh hóa miễn dịch tự động, máy sinh hóa tự động, máy xét nghiệm huyết học, xét nghiệm đông máu tự động",
      ],
      endoscopy: [
        "Nội soi thực quản - dạ dày - tá tràng chẩn đoán",
        "Nội soi đại trực tràng chẩn đoán",
        "Nội soi đường mật - tụy ngược dòng ERCP",
        "Siêu âm nội soi chẩn đoán bệnh lý thuộc cơ quan tiêu hóa, chọc hút tế bào",
        "Nội soi can thiệp, nong hẹp đường tiêu hóa",
        "Nội soi đặt stent khí quản, đặt sonde tá tràng",
        "Nội soi can thiệp đại tràng",
      ],
    }
    },

    "cho-ray": {
    name: "Bệnh viện Chợ Rẫy",
    address: "201B Nguyễn Chí Thanh, Phường 12, Quận 5, TP. Hồ Chí Minh",
    logo: "/cho-ray.jpg",
    background: "/cho-ray-bg.png",
    introduction: "Bệnh viện Chợ Rẫy là một trong những bệnh viện lớn nhất ở TP. Hồ Chí Minh...",
  },

  "doctor-check": {
    name: "Doctor Check",
    address: "99 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh",
    logo: "/doctor-check.jpg",
    background: "/doctor-check-bg.png",
    introduction: "Doctor Check chuyên về tầm soát bệnh lý để sống thọ hơn...",
  },

  "y-duoc": {
    name: "Phòng khám Bệnh viện Đại học Y Dược 1",
    address: "215 Hồng Bàng, Phường 11, Quận 5, TP. Hồ Chí Minh",
    logo: "/y-duoc.jpg",
    background: "/y-duoc-bg.png",
    introduction: "Bệnh viện Đại học Y Dược là một trong những cơ sở y tế hàng đầu...",
  },

  "ung-buou": {
    name: "Bệnh viện Ung bướu Hưng Việt",
    address: "34 Đại Cổ Việt, Hai Bà Trưng, Hà Nội",
    logo: "/",
    background: "/",
    introduction: "",
  },
  "medlatec": {
    name: "Hệ thống y tế MEDLATEC",
    address: "42 Nghĩa Dũng, Phúc Xá, Bà Đình, Hà Nội ",
    logo: "/",
    background: "/",
    introduction: "",
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
<div>
{/* Khung vàng */}
<div className="info-box yellow">
BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với
trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ,
sản phẩm y tế chất lượng cao.
</div>

{/* Khung xanh */}
<div className="info-box blue">
<p>
  Từ nay, người bệnh có thể đặt lịch tại Khu khám bệnh theo yêu cầu, Bệnh viện Hữu nghị Việt Đức thông qua hệ thống đặt khám BookingCare.
</p>
<ul>
  <li>Được lựa chọn các giáo sư, tiến sĩ, bác sĩ chuyên khoa giàu kinh nghiệm</li>
  <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch)</li>
  <li>Giảm thời gian chờ đợi khi làm thủ tục khám và ưu tiên khám trước</li>
  <li>Nhận được hướng dẫn chi tiết sau khi đặt lịch</li>
</ul>
</div>
</div>
<Footer/>




{/* Nút đặt khám */}
<button className="booking-button" onClick={() => navigate(`/dat-kham/${id}`)}>
          Chọn Đặt Khám
        </button>





</div>


   
  );
};

export default HospitalDetail;
