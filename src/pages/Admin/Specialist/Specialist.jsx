import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../util/axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Specialist.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Specialist = () => {
  
  const [file, setFile] = useState(null);
  const [specialtyName, setSpecialtyName] = useState("");
  const [description, setDescription] = useState("");
  const [specialties, setSpecialties] = useState([]); 


  const fetchSpecialties = useCallback(async () => {
    try {
      const res = await axiosInstance.get("http://localhost:8084/api/get-specialty");
      if (res.data.errCode === 0) setSpecialties(res.data.data || []);
      else toast.error(res.data.errMessage || "Không tải được chuyên khoa.");
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối server khi tải chuyên khoa.");
    }
  }, []);

  useEffect(() => {
    fetchSpecialties();
  }, [fetchSpecialties]);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleNameChange = (e) => setSpecialtyName(e.target.value);
  const handleDescriptionChange = (value) => setDescription(value);


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
      const res = await axiosInstance.post(
        "http://localhost:8084/api/create-new-specialty",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data && res.data.errCode === 0) {
        Swal.fire("Thành công!", "Chuyên khoa đã được thêm!", "success");
        setSpecialtyName("");
        setFile(null);
        setDescription("");
        fetchSpecialties(); // refresh bảng
      } else {
        toast.error(res.data.errMessage || "Có lỗi khi thêm chuyên khoa.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối đến server!");
    }
  };

  /* ---------- XOÁ CHUYÊN KHOA ---------- */
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
      const res = await axiosInstance.delete("http://localhost:8084/api/delete-specialty", {
        params: { id },
      });

      if (res.data.errCode === 0) {
        toast.success("Đã xoá chuyên khoa!");
        fetchSpecialties();
      } else {
        toast.error(res.data.errMessage || "Không xoá được chuyên khoa.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Lỗi kết nối server khi xoá.");
    }
  };

  /* ---------- RENDER ---------- */
  return (
    <div className="form-container">
      <h2>QUẢN LÝ CHUYÊN KHOA</h2>

      {/* FORM THÊM CHUYÊN KHOA */}
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
        <label>Mô tả chuyên khoa</label>
        <ReactQuill
          theme="snow"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Nhập mô tả chuyên khoa"
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
          }}
        />
      </div>

      <button className="save-button" onClick={handleSubmit}>Lưu</button>

      {/* BẢNG CHUYÊN KHOA */}
      <h3 style={{ marginTop: "40px" }}>Danh sách chuyên khoa</h3>
      <div className="table-wrapper">
        <table className="specialty-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên chuyên khoa</th>
              <th>Ảnh chuyên khoa</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {specialties.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>Không có dữ liệu</td>
              </tr>
            ) : (
              specialties.map((s, idx) => (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td>{s.name}</td>
                  <td>
                    {s.image ? (
                      <img src={`http://localhost:8084/${s.image}`} alt={s.name} className="thumb" />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(s.id)}>
                      <i class="fa-solid fa-trash"></i>
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

export default Specialist;
