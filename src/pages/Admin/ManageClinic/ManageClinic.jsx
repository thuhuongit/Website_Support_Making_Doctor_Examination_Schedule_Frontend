import { useState, useEffect, useCallback } from "react";
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setClinicName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = async () => {
    if (!clinicName || !address || !description || !file) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("name", clinicName);
    formData.append("address", address);
    formData.append("image", file);
    formData.append("description", description);

    try {
      const response = await axiosInstance.post(
        "http://localhost:8084/api/create-new-clinic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.errCode === 0) {
        Swal.fire("Thành công!", "Phòng khám đã được thêm!", "success");
        setClinicName('');
        setAddress('');
        setFile(null);
        setDescription('');
        fetchClinics();
      } else {
        toast.error(response.data.errMessage || "Có lỗi xảy ra khi thêm phòng khám.");
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

  return (
    <div className="form-container">
      <h2>QUẢN LÝ PHÒNG KHÁM</h2>

      <div className="form-group">
        <label>Tên phòng khám</label>
        <input
          type="text"
          placeholder="Nhập tên phòng khám"
          value={clinicName}
          onChange={handleNameChange}
        />
      </div>

      <div className="form-group">
        <label>Địa chỉ phòng khám</label>
        <input
          type="text"
          placeholder="Nhập địa chỉ phòng khám"
          value={address}
          onChange={handleAddressChange}
        />
      </div>

      <div className="form-group">
        <label>Ảnh phòng khám</label>
        <input type="file" onChange={handleFileChange} />
        {file && <span>{file.name}</span>}
      </div>

      <div className="form-group">
        <label>Mô tả phòng khám</label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Nhập mô tả phòng khám"
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

      <button className="save-button" onClick={handleSubmit}>Lưu</button>

      {/* BẢNG PHÒNG KHÁM */}
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
                      <img
                        src={`http://localhost:8084/${clinic.image}`}
                        alt={clinic.name}
                        className="thumb"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(clinic.id)}>
                      <i className="fa-solid fa-trash"></i>
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