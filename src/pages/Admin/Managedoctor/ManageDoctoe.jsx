import { useState, useEffect } from "react";
import axiosInstance from "../../../util/axios";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import "./ManageDoctor.css";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

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
  const [doctorInfos, setDoctorInfos] = useState([]);
  const [editingId, setEditingId] = useState(null);



  useEffect(() => {
    async function fetchDoctors() {
      try {
        const res = await axiosInstance.get("http://localhost:8084/api/get-all-doctors");
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
        const res = await axiosInstance.get("http://localhost:8084/api/get-specialty");
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
        const res = await axiosInstance.get("http://localhost:8084/api/get-clinic");
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
    if (!selectedDoctor) {
       toast.error("Bạn phải chọn bác sĩ để cập nhật.");
       return;
    }


    const data = {
      id: editingId,
      doctorId: selectedDoctor,
      contentHTML: contentHTML || "",
      contentMarkdown: contentMarkdown || "",
      action: editingId ? "EDIT" : "CREATE",
      selectedPrice: selectedPrice || "100.000",
      selectedPayment: selectedPayment || "cash",
      selectedProvince: selectedProvince || "hanoi",
      clinicId: clinicId || null,
      nameClinic: nameClinic || "",
      addressClinic: addressClinic || "",
      note: note || "",
      specialtyId: specialtyId || null,
      description: description || ""
    };


    try {
      const res = await axiosInstance.post("http://localhost:8084/api/save-infor-doctors", data);
      if (res.data.errCode === 0) {
        toast.success("Lưu thông tin bác sĩ thành công!");
        fetchDoctorInfos();

        setSelectedDoctor("");
        setContentHTML("");
        setContentMarkdown("");
        setSelectedPrice("");
        setSelectedPayment("");
        setSelectedProvince("");
        setClinicId("");
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

  useEffect(() => {
  fetchDoctorInfos();
  }, []);

  const fetchDoctorInfos = async () => {
      try {
          const res = await axiosInstance.get("http://localhost:8084/api/get-all-doctor-infos");
          console.log("Fetched doctor infos:", res.data);
          if (res.data.errCode === 0) {
             setDoctorInfos(res.data.data);
          } else {
             toast.error("Không thể lấy danh sách thông tin bác sĩ");
          }
          } catch (err) {
             toast.error("Lỗi kết nối khi lấy dữ liệu.");
          }
      };

    const handleEdit = (info) => {
      console.log("INFO được chọn để sửa:", info);
      console.log("Dữ liệu markdown:", info.markdown);
       setSelectedDoctor(info.doctorId);
       setContentHTML(info.markdown?.contentHTML || "");
       setContentMarkdown(info.markdown?.contentMarkdown || "");
       setDescription(info.markdown?.description || "");
       setSelectedPrice(info.priceId || "");
       setSelectedPayment(info.paymentId || "");
       setSelectedProvince(info.provinceId || "");
       setClinicId(info.clinicId || "");
       setNameClinic(info.nameClinic || "");
       setAddressClinic(info.addressClinic || "");
       setNote(info.note || "");
       setSpecialtyId(info.specialtyId || "");
       setEditingId(info.id);
    };
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Bạn có chắc muốn xoá?",
      text: "Thao tác này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xoá",
      cancelButtonText: "Huỷ",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axiosInstance.delete("http://localhost:8084/api/delete-doctor", {
        params: { id },
      });

      if (res.data.errCode === 0) {
        toast.success("Đã xoá doctor!");
        fetchDoctorInfos();
      } else {
        toast.error(res.data.errMessage || "Không xoá được doctor.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối server khi xoá.");
    }
  };
  const provinceMap = {
  hanoi: "Hà Nội",
  hochiminh: "Hồ Chí Minh",
  danang: "Đà Nẵng",
  lamdong: "Lâm Đồng"
};


  return (
    <div className="manage-doctor-info-container">
      <h2 className="title">{editingId ? "CHỈNH SỬA THÔNG TIN BÁC SĨ" : "QUẢN LÝ THÔNG TIN BÁC SĨ"}</h2>
  
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
            <option value="100.000">100.000 VNĐ</option>
            <option value="200.000">200.000 VNĐ</option>
            <option value="300.000">300.000 VNĐ</option>
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
        <label>Mô tả ngắn</label>
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
      </div>

  
      <div className="form-row">
        <div className="form-group">
          <label>Thông tin chi tiết</label>
          <ReactQuill
             theme="snow"
             value={contentMarkdown}
             onChange={setContentMarkdown}
             placeholder="Nhập nội dung chi tiết (markdown)..."
             modules={{
             toolbar: [
               [{ header: [1, 2, false] }],
               ['bold', 'italic', 'underline', 'strike'],
               [{ list: 'ordered' }, { list: 'bullet' }],
               ['link', 'image'],
               ['clean'],
           ],
        }}
         />
        </div>
  
        <div className="form-group">
          <label>Mô tả HTML</label>
           <ReactQuill
             theme="snow"
             value={contentHTML}
             onChange={setContentHTML}
             placeholder="Nhập mô tả HTML..."
             modules={{
             toolbar: [
               [{ header: [1, 2, false] }],
               ['bold', 'italic', 'underline', 'strike'],
               [{ list: 'ordered' }, { list: 'bullet' }],
               ['link', 'image'],
               ['clean'],
           ],
        }}
          />
        </div>
      </div>
  
      <button className="save-btn" onClick={handleSubmit}>
        {editingId ? "Cập nhật" : "Lưu thông tin"}
      </button>
      <h3>Danh sách thông tin bác sĩ</h3>
      <table className="doctor-table">
         <thead>
           <tr>
              <th>Bác sĩ</th>
              <th>Chuyên khoa</th>
              <th>Phòng khám</th>
              <th>Giá</th>
              <th>Tỉnh</th>
              <th>Hành động</th>
           </tr>
         </thead>
         <tbody>
         {doctorInfos.map((info) => (
             <tr key={info.id}>
                <td>{info.doctorData?.lastName} {info.doctorData?.firstName}</td>
                <td>{info.specialtyData?.name}</td>
                <td>{info.clinicData?.name}</td>
                <td>{info.priceId}</td>
                <td>{provinceMap[info.provinceId]}</td>
                <td>
                   <button className="edit-btn" onClick={() => handleEdit(info)}><i className="fa-solid fa-pen-to-square"></i></button>
                   <button className="delete-btn" onClick={() => handleDelete(info.id)}><i className="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

  
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}  

export default ManageDoctorInfo;
