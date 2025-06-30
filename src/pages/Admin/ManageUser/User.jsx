import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axiosInstance from "../../../util/axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./User.css";

const User = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    phone: "",
    address: "",
    gender: "",
    role: "",
    position: "",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axiosInstance
      .get("http://localhost:8084/api/get-all-users?id=all")
      .then((res) => {
        setUsers(res.data.users || []);
      })
      .catch((err) => {
        console.error("Error fetching users: ", err);
        toast.error("Không thể lấy danh sách người dùng!", {
          position: "top-right",
        });
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleEdit = (user) => {
    console.log("User to edit:", user);

    const genderMap = {
    0: "Nam",
    1: "Nữ",
    2: "Khác",
  };
    setFormData({
      email: user.email || "",
      password: user.password ||"", 
      lastName: user.lastName || "",
      firstName: user.firstName || "",
      phone: user.phone || "",
      address: user.address || "",
      gender: genderMap[user.gender],
      role: user.role || "",
      position: user.position || "",
      avatar: null,
    });
    setEditingUserId(user.id);
    setAvatarPreview(user.image ? `data:image/jpeg;base64,${user.image}` : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form");
    const { email, lastName, firstName } = formData;

    if (!email || !lastName || !firstName) {
      toast.error("Vui lòng nhập đầy đủ thông tin!", {
        position: "top-right",
      });
      return;
    }

    const payload = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    }

    try {
      let response;

      if (editingUserId) {
        payload.append("id", editingUserId);
        response = await axiosInstance.put(
          "http://localhost:8084/api/edit-user",
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axiosInstance.post(
          "http://localhost:8084/api/create-new-user",
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      if (response.data?.errCode === 0) {
        toast.success(
          editingUserId ? "Cập nhật người dùng thành công!" : "Tạo người dùng thành công!",
          { position: "top-right" }
        );
        resetForm();
        fetchUsers();
      } else {
        toast.error("Lỗi: " + response.data.errMessage, { position: "top-right" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi xảy ra.", { position: "top-right" });
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      phone: "",
      address: "",
      gender: "",
      role: "",
      position: "",
      avatar: null,
    });
    setAvatarPreview(null);
    setEditingUserId(null);
  };

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete("http://localhost:8084/api/delete-user", {
          data: { id: userId },
        });

        if (response.data.errCode === 0) {
          toast.success("Xóa người dùng thành công!", { position: "top-right" });
          fetchUsers();
        } else {
          toast.error("Lỗi khi xóa người dùng: " + response.data.errMessage, {
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        toast.error("Không thể xóa người dùng!", { position: "top-right" });
      }
    }
  };

  return (
    <div className="user-form-container">
      <h2>THÊM BÁC SĨ VÀ ADMIN MỚI</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="email" placeholder="Email"  value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Họ" value={formData.lastName} onChange={handleChange} />
          <input type="text" name="firstName" placeholder="Tên" value={formData.firstName} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input type="text" name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} />
          <input type="text" name="address" placeholder="Địa chỉ" value={formData.address} onChange={handleChange} />
        </div>

        <div className="form-row" >
          <select name="gender" className="small-select" value={formData.gender} onChange={handleChange} >
            <option value="">-- Chọn giới tính --</option>
            <option value="0">Nam</option>
            <option value="1">Nữ</option>
            <option value="2">Khác</option>
          </select>

          <select name="role" className="small-select" value={formData.role} onChange={handleChange} >
           <option value="">-- Chọn chức vụ --</option>
           <option value="Admin">Admin</option>
           <option value="Bác sĩ">Bác sĩ</option>
            
          </select>

          <select name="position" className="small-select" value={formData.position} onChange={handleChange}  disabled={formData.role === "Admin"}  >
            <option value="">-- Chọn cấp bậc --</option>
            <option value="Bác sĩ">Bác sĩ</option>
            <option value="Tiến sĩ">Tiến sĩ</option>
            <option value="Thạc sĩ">Thạc sĩ</option>
            <option value="Phó giáo sư">Phó giáo sư</option>
            <option value="Giáo sư">Giáo sư</option>
          </select>
        </div>
        <div className="upload-container">
            <label htmlFor="avatar">Tải ảnh</label>
            <input id="avatar" type="file" accept="image/*" onChange={handleImageChange} />
          </div>

        {avatarPreview && (
          <div className="avatar-preview">
            <img src={avatarPreview} alt="avatar preview" />
          </div>
        )}

        <button type="submit" className="save-btn" onClick={(e) => e.stopPropagation()}>
          {editingUserId ? "Cập nhật" : "Lưu thông tin"}
        </button>
        {editingUserId && (
          <button type="button" className="cancel-btn" onClick={resetForm}>
            Hủy
          </button>
        )}
      </form>

      <h3>Danh sách người dùng</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Họ</th>
            <th>Tên</th>
            <th>Địa chỉ</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.address}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(user)}><FaEdit /></button>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default User;
