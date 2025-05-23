import { useState } from "react";
import axiosInstance from "../../../util/axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Specialist.css";

const Specialist = () => {
  const [file, setFile] = useState(null);
  const [specialtyName, setSpecialtyName] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setSpecialtyName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async () => {
    if (!specialtyName || !description || !file) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const formData = new FormData();
    formData.append("name", specialtyName);
    formData.append("image", file);
    formData.append("descriptionMarkdown", description);
    formData.append("descriptionHTML", description); 
    
    try {
      const response = await axiosInstance.post(
        "http://localhost:8083/api/create-new-specialty",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.errCode === 0) {
        Swal.fire("Thành công!", "Chuyên khoa đã được thêm!", "success");
        setSpecialtyName('');
        setFile(null);
        setDescription('');
      } else {
        toast.error(response.data.errMessage || "Có lỗi xảy ra khi thêm chuyên khoa.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối đến server!");
    }
  };

  return (
    <div className="form-container">
      <h2>QUẢN LÝ CHUYÊN KHOA</h2>

      <div className="form-group">
        <label>Tên chuyên khoa</label>
        <input
          type="text"
          placeholder="Nhập tên chuyên khoa"
          value={specialtyName}
          onChange={handleNameChange}
        />
      </div>

      <div className="form-group">
        <label>Ảnh chuyên khoa</label>
        <input type="file" onChange={handleFileChange} />
        {file && <span>{file.name}</span>}
      </div>

      <div className="form-group">
        <label>Mô tả (Markdown hoặc văn bản)</label>
        <textarea
          placeholder="Nhập mô tả chuyên khoa"
          value={description}
          onChange={handleDescriptionChange}
        ></textarea>
      </div>

      <button className="save-button" onClick={handleSubmit}>Lưu</button>

      <ToastContainer />
    </div>
  );
};

export default Specialist;
