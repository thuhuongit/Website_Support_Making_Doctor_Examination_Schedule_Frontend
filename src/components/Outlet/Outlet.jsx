import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstance from "../../../util/axios";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Outlet.css";

const ManageUser = () => {
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
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axiosInstance
      .get("http://localhost:8082/api/get-all-users?id=all")
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, firstName, lastName } = formData;
    if (!email || !password || !firstName || !lastName) {
      toast.error("⚠ Vui lòng nhập đầy đủ thông tin!", {
        position: "top-right",
      });
      return;
    }

    try {
      const res = await axiosInstance.post(
        "http://localhost:8082/api/create-new-user",
        formData
      );

      if (res.data?.errCode === 0) {
        toast.success("Tạo người dùng thành công!", {
          position: "top-right",
        });
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
        });
        fetchUsers();
      } else {
        toast.error("Lỗi: " + res.data.errMessage, {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi xảy ra khi tạo người dùng.", {
        position: "top-right",
      });
    }
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
        const response = await axiosInstance.delete(
          "http://localhost:8082/api/delete-user",
          {
            data: { id: userId },
          }
        );

        if (response.data.errCode === 0) {
          toast.success("Xóa người dùng thành công!", {
            position: "top-right",
          });
          fetchUsers();
        } else {
          toast.error("Lỗi khi xóa người dùng: " + response.data.errMessage, {
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        toast.error("Không thể xóa người dùng!", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="main-content">
      <h2 className="title">QUẢN LÝ NGƯỜI DÙNG</h2>

      <form className="user-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstName"
          placeholder="Tên"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Họ"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Số điện thoại"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={formData.address}
          onChange={handleChange}
        />

        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option>Nam</option>
          <option>Nữ</option>
          <option>Khác</option>
        </select>

        <select name="role" value={formData.role} onChange={handleChange}>
          <option>Bệnh nhân</option>
          <option>Bác sĩ</option>
          <option>Admin</option>
        </select>

        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
        >
          <option>Bác sĩ</option>
          <option>Giáo sư</option>
          <option>None</option>
        </select>

        <button type="submit">Lưu người dùng</button>
      </form>

      <table className="user-table">
        <thead>
          <tr>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Điện thoại</th>
            <th>Giới tính</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                Không có người dùng nào.
              </td>
            </tr>
          ) : (
            users.map((u) => (
              <tr key={u.id}>
                <td>
                  {u.firstName} {u.lastName}
                </td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.phone}</td>
                <td>{u.gender}</td>
                <td>
                  {u.roleId === "1"
                    ? "Admin"
                    : u.roleId === "2"
                    ? "Bác sĩ"
                    : "Bệnh nhân"}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(u.id)}
                    className="btn-delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <ToastContainer />
    </div>
  );
};

export default ManageUser;
