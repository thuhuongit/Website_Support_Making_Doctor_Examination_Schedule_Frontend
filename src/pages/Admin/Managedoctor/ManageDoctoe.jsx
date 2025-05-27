import { useState, useEffect } from "react";
import axiosInstance from "../../../util/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageDoctor.css";

function ManageDoctorInfo() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [nameClinic, setNameClinic] = useState("");
  const [addressClinic, setAddressClinic] = useState("");
  const [note, setNote] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [specialtyId, setSpecialtyId] = useState("");
  const [clinics, setClinic] = useState([]);
  const [clinicId, setClinicId] = useState("");
  const [description, setDescription] = useState ("");
 


  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await axiosInstance.get("http://localhost:8083/api/get-all-doctors");
        if (res.data.errCode === 0) {
          setDoctors(res.data.data);
        } else {
          toast.error("Lấy danh sách bác sĩ thất bại.");
        }
      } catch {
        toast.error("Lỗi khi lấy dữ liệu bác sĩ.");
      }
    }
    fetchDoctors();
  }, []);


  useEffect(() => {
    async function fetchSpecialties() {
      try {
        const res = await axiosInstance.get("http://localhost:8083/api/get-specialty");
        if (res.data && res.data.errCode === 0) {
          setSpecialties(res.data.data); 
        } else {
          toast.error("Không lấy được danh sách chuyên khoa.");
        }
      } catch (error) {
        console.error("Failed to load specialties:", error);
        toast.error("Lỗi khi lấy dữ liệu chuyên khoa.");
      }
    }

    fetchSpecialties();
  }, []);

    useEffect(() => {
    async function fetchClinics() {
      try {
        const res = await axiosInstance.get("http://localhost:8083/api/get-clinic");
        if (res.data && res.data.errCode === 0) {
          setClinic(res.data.data); 
        } else {
          toast.error("Không lấy được danh sách chuyên khoa.");
        }
      } catch (error) {
        console.error("Failed to load specialties:", error);
        toast.error("Lỗi khi lấy dữ liệu phòng khám.");
      }
    }

    fetchClinics();
  }, []);

  const handleSubmit = async () => {
    if (
      !selectedDoctor ||
      !contentHTML ||
      !contentMarkdown ||
      !selectedPrice ||
      !selectedPayment ||
      !selectedProvince ||
      !nameClinic ||
      !addressClinic ||
      !specialtyId ||
      !description
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    const data = {
      doctorId: selectedDoctor,
      contentHTML,
      contentMarkdown,
      action: "CREATE",
      selectedPrice,
      selectedPayment,
      selectedProvice: selectedProvince,
      nameClinic,
      addressClinic,
      note,
      specialtyId,
      description,
    };

    try {
      const res = await axiosInstance.post("http://localhost:8083/api/save-infor-doctors", data);
      if (res.data.errCode === 0) {
        toast.success("Lưu thông tin bác sĩ thành công!");
        setSelectedDoctor("");
        setContentHTML("");
        setContentMarkdown("");
        setSelectedPrice("");
        setSelectedPayment("");
        setSelectedProvince("");
        setNameClinic("");
        setAddressClinic("");
        setNote("");
        setSpecialtyId("");
        setDescription(""); 
      } else {
        toast.error(res.data.errMessage || "Lưu thất bại");
      }
    } catch {
      toast.error("Có lỗi khi lưu thông tin bác sĩ.");
    }
  };
  const uniqueDoctors = doctors.filter((doctor, index, self) =>
  index === self.findIndex((d) => d.id === doctor.id)
);


  return (
    <div className="manage-doctor-info-container">
      <h2 className="title">QUẢN LÝ THÔNG TIN BÁC SĨ</h2>
  
      <div className="manage-doctor-info-form">
        <div className="form-group">
          <label>Chọn bác sĩ</label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
          >
            <option value="">-- Chọn bác sĩ --</option>
            {uniqueDoctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.lastName} {doctor.firstName}
              </option>
            ))}
          </select>
        </div>
  
        <div className="form-group">
          <label>Chọn giá</label>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value="">-- Chọn giá --</option>
            <option value="100000">100.000 VNĐ</option>
            <option value="200000">200.000 VNĐ</option>
            <option value="300000">300.000 VNĐ</option>
          </select>
        </div>
  
        <div className="form-group">
          <label>Chọn phương thức thanh toán</label>
          <select
            value={selectedPayment}
            onChange={(e) => setSelectedPayment(e.target.value)}
          >
            <option value="">-- Chọn phương thức --</option>
            <option value="cash">Tiền mặt</option>
            <option value="banking">Chuyển khoản</option>
          </select>
        </div>
  
        <div className="form-group">
          <label>Tỉnh thành</label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
          >
            <option value="">-- Chọn tỉnh --</option>
            <option value="hanoi">Hà Nội</option>
            <option value="hochiminh">Hồ Chí Minh</option>
            <option value="danang">Đà Nẵng</option>
            <option value="danang">Lâm Đồng</option>
          </select>
        </div>
  
        <div className="form-group">
          <label>Tên phòng khám</label>
          <input
            type="text"
            value={nameClinic}
            onChange={(e) => setNameClinic(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label>Địa chỉ phòng khám</label>
          <input
            type="text"
            value={addressClinic}
            onChange={(e) => setAddressClinic(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label>Ghi chú</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label>Chuyên khoa</label>
          <select
            value={specialtyId}
            onChange={(e) => setSpecialtyId(e.target.value)}
          >
            <option value="">-- Chọn chuyên khoa --</option>
            {specialties.map((item) => (
               <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>


        <div className="form-group">
          <label>Phòng khám</label>
          <select
            value={clinicId}
            onChange={(e) => setClinicId(e.target.value)}
          >
            <option value="">-- Chọn phòng khám --</option>
            {clinics.map((item) => (
               <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div> 
      </div>

            
      <div className="form-group">
        <label>Mô tả ngắn (Description)</label>
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
      </div>

  
      <div className="form-row">
        <div className="form-group">
          <label>Thông tin chi tiết (Markdown)</label>
          <textarea
            value={contentMarkdown}
            onChange={(e) => setContentMarkdown(e.target.value)}
          />
        </div>
  
        <div className="form-group">
          <label>Mô tả HTML</label>
          <textarea
            value={contentHTML}
            onChange={(e) => setContentHTML(e.target.value)}
          />
        </div>
      </div>
  
      <button className="save-btn" onClick={handleSubmit}>
        Lưu thông tin
      </button>
  
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}  

export default ManageDoctorInfo;
