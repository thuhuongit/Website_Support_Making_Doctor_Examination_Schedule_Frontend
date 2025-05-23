import { useState } from "react";
import axiosInstance from "../../../util/axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ManageClinic.css";

const ManageClinic = () => {
  const [clinicName, setClinicName] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setClinicName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
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
    formData.append("descriptionMarkdown", description);

    try {
      const response = await axiosInstance.post(
        "http://localhost:8083/api/create-new-clinic", 
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
      } else {
        toast.error(response.data.errMessage || "Có lỗi xảy ra khi thêm phòng khám.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối đến server!");
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
        <textarea
          placeholder="Nhập mô tả phòng khám"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>

      <button className="save-button" onClick={handleSubmit}>Lưu</button>
      

      <ToastContainer />
      
    </div>
    
  );
};

export default ManageClinic;
