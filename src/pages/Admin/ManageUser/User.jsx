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
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    gender: "Nam",
    role: "Bệnh nhân",
    position: "Bác sĩ",
    avatar: null,
    specialty: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axiosInstance
      .get("http://localhost:8083/api/get-all-users?id=all")
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
    setFormData({
      email: user.email || "",
      password: user.password ||"", 
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      address: user.address || "",
      gender: user.gender || "",
      role: user.role || "",
      position: user.position || "",
      avatar: null,
      specialty: user.specialty || "",
    });
    setEditingUserId(user.id);
    setAvatarPreview(user.image ? `data:image/jpeg;base64,${user.image}` : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, firstName, lastName } = formData;

    if (!email || !firstName || !lastName) {
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
          "http://localhost:8083/api/edit-user",
          payload,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axiosInstance.post(
          "http://localhost:8083/api/create-new-user",
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
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      gender: "Nam",
      role: "Bệnh nhân",
      position: "Bác sĩ",
      avatar: null,
      specialty: "",
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
        const response = await axiosInstance.delete("http://localhost:8083/api/delete-user", {
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
      <h1 style={{ textAlign: 'center' }}>THÊM NGƯỜI DÙNG MỚI</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Mật khẩu" value={formData.password} onChange={handleChange} />
          <input type="text" name="firstName" placeholder="Tên" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="Họ" value={formData.lastName} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input type="text" name="phone" placeholder="Số điện thoại" value={formData.phone} onChange={handleChange} />
          <input type="text" name="address" placeholder="Địa chỉ" value={formData.address} onChange={handleChange} />
        </div>

        <div className="form-row">
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>

          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Bệnh nhân">Bệnh nhân</option>
            <option value="Bác sĩ">Bác sĩ</option>
            <option value="Admin">Admin</option>
          </select>

          <select name="specialty" value={formData.specialty} onChange={handleChange}>
            <option value="">-- Chọn chuyên khoa --</option>
            <option value="Tim mạch">Tim mạch</option>
            <option value="Tiêu hóa">Tiêu hóa</option>
            <option value="Nhi khoa">Nhi khoa</option>
            <option value="Da liễu">Da liễu</option>
            <option value="Thần kinh">Thần kinh</option>
          </select>

          <div className="upload-container">
            <label htmlFor="avatar">Tải ảnh</label>
            <input id="avatar" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
        </div>

        {avatarPreview && (
          <div className="avatar-preview">
            <img src={avatarPreview} alt="avatar preview" />
          </div>
        )}

        <button type="submit" className="save-btn">
          {editingUserId ? "Cập nhật" : "Lưu user"}
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
            <th>Hành động</th>
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
