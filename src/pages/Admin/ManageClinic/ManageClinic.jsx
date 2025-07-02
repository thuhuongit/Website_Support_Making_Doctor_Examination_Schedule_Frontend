import { useState, useEffect, useCallback } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axiosInstance from "../../../util/axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageClinic.css";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const ManageClinic = () => {
  const [clinicName, setClinicName] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [clinics, setClinics] = useState([]);
  const [editingClinicId, setEditingClinicId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fetchClinics = useCallback(async () => {
    try {
      const res = await axiosInstance.get("http://localhost:8084/api/get-clinic");
      if (res.data.errCode === 0) setClinics(res.data.data || []);
      else toast.error(res.data.errMessage || "Không tải được phòng khám.");
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối server khi tải phòng khám.");
    }
  }, []);

  useEffect(() => {
    fetchClinics();
  }, [fetchClinics]);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleNameChange = (e) => setClinicName(e.target.value);
  const handleAddressChange = (e) => setAddress(e.target.value);
  const handleDescriptionChange = (value) => setDescription(value);

  const resetForm = () => {
    setClinicName('');
    setAddress('');
    setFile(null);
    setDescription('');
    setEditingClinicId(null);
  };

  const handleSubmit = async () => {
    if (!clinicName || !address || !description) {
      toast.error("Vui lòng nhập đầy đủ thông tin!", {
        position: "top-right",
      });
      return;
    }
    const formData = new FormData();
    formData.append("name", clinicName);
    formData.append("address", address);
    formData.append("description", description);
    if (file) formData.append("image", file);
    try {
      const url = editingClinicId
        ? `http://localhost:8084/api/edit-clinic`
        : `http://localhost:8084/api/create-new-clinic`;
      if (editingClinicId) formData.append("id", editingClinicId);

      const response = await axiosInstance({
        method: editingClinicId ? 'put' : 'post',
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.errCode === 0) {
        Swal.fire("Thành công!", editingClinicId ? "Phòng khám đã được cập nhật!" : "Phòng khám đã được thêm!", "success");
        resetForm();
        fetchClinics();
      } else {
        toast.error(response.data.errMessage || "Có lỗi xảy ra khi xử lý dữ liệu.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối đến server!");
    }
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
      const res = await axiosInstance.delete("http://localhost:8084/api/delete-clinic", {
        params: { id },
      });

      if (res.data.errCode === 0) {
        toast.success("Đã xoá phòng khám!");
        fetchClinics();
      } else {
        toast.error(res.data.errMessage || "Không xoá được phòng khám.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối server khi xoá.");
    }
  };
  const handleEdit = (clinic) => {
    setClinicName(clinic.name);
    setAddress(clinic.address);
    setDescription(clinic.description);
    setEditingClinicId(clinic.id);
    setFile(null);
    setPreviewImage(`http://localhost:8084/${clinic.image}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="form-container">
      <h2>{editingClinicId ? "CHỈNH SỬA PHÒNG KHÁM" : "QUẢN LÝ PHÒNG KHÁM"}</h2>

      <div className="form-group">
        <label>Tên phòng khám</label>
        <input type="text" value={clinicName} onChange={handleNameChange} placeholder="Nhập tên" />
      </div>

      <div className="form-group">
        <label>Địa chỉ phòng khám</label>
        <input type="text" value={address} onChange={handleAddressChange} placeholder="Nhập địa chỉ" />
      </div>

      <div className="form-group">
          <label>Ảnh phòng khám</label>
          <input type="file" onChange={handleFileChange} />
          {file && <span>{file.name}</span>}
          {!file && previewImage && (
         <div style={{ marginTop: "10px" }}>
             <p>Ảnh hiện tại:</p>
             <img src={previewImage} alt="Preview" className="thumb" />
        </div>
          )}
     </div>

      <div className="form-group">
        <label>Mô tả phòng khám</label>
        <ReactQuill value={description} onChange={handleDescriptionChange} />
      </div>

      <button className="save-button" onClick={handleSubmit}>{editingClinicId ? 'Cập nhật' : 'Lưu thông tin'}</button>

      <h3 style={{ marginTop: "40px" }}>Danh sách phòng khám</h3>
      <div className="table-wrapper">
        <table className="clinic-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên phòng khám</th>
              <th>Ảnh phòng khám</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {clinics.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>Không có dữ liệu</td>
              </tr>
            ) : (
              clinics.map((clinic, idx) => (
                <tr key={clinic.id}>
                  <td>{idx + 1}</td>
                  <td>{clinic.name}</td>
                  <td>
                    {clinic.image ? (
                      <img src={`http://localhost:8084/${clinic.image}`} alt={clinic.name} className="thumb" />
                    ) : "N/A"}
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(clinic)}>
                      <FaEdit />
                    </button>
                    
                    <button className="delete-btn" onClick={() => handleDelete(clinic.id)}>
                      <FaTrash />
                    </button>
                    
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default ManageClinic;