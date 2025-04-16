import { FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import axiosInstance from "../../../util/axios";
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => (
  <div className="sidebar">
    <div className="user-info">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" />
      <div>
        <p><strong>Xin chào, Admin!</strong></p>
        <p className="text-xs text-gray-500">ADMIN</p>
      </div>
    </div>
    <nav>
      <div>Dashboard</div>
      <div className="active">Manage User</div>
      <div>Manage Doctor</div>
      <div>Manage Health Examination Plan</div>
      <div>Manage Clinic</div>
      <div>Manage Specialty</div>
    </nav>
  </div>
);

const ManageUser = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    gender: 'Nam',
    role: 'Bệnh nhân',
    position: 'Bác sĩ',
  });

  const [users, setUsers] = useState([]); 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axiosInstance.get("http://localhost:8081/api/get-all-users?id=all")
      .then(res => {
        console.log("Users data: ", res.data.users);  // Kiểm tra dữ liệu trả về
        const userList = res.data.users || []; 
        setUsers(userList);
      })
      .catch(err => {
        console.error("Error fetching users: ", err);
        toast.error("Không thể lấy danh sách người dùng!", { position: "top-right" });
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

    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      toast.error("⚠ Vui lòng nhập đầy đủ thông tin!", { position: "top-right" });
      return;
    }

    try {
      const res = await axiosInstance.post("http://localhost:8081/api/create-new-user", formData);

      if (res.data && res.data.errCode === 0) {
        toast.success("Tạo người dùng thành công!", { position: "top-right" });
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phone: '',
          address: '',
          gender: 'Nam',
          role: 'Bệnh nhân',
          position: 'Bác sĩ',
        });

        fetchUsers(); 
      } else {
        toast.error("Lỗi: " + res.data.errMessage, { position: "top-right" });
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã có lỗi xảy ra khi tạo người dùng.", { position: "top-right" });
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
        const response = await axiosInstance.delete("http://localhost:8081/api/delete-user", {
          data: { id: userId }
        });

        if (response.data.errCode === 0) {
          toast.success("Xóa người dùng thành công!", { position: "top-right" });
          fetchUsers(); 
        } else {
          toast.error("Lỗi khi xóa người dùng: " + response.data.errMessage, { position: "top-right" });
        }
      } catch (error) {
        console.error("Lỗi khi xóa:", error);
        toast.error("Không thể xóa người dùng!", { position: "top-right" });
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
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

          <select name="position" value={formData.position} onChange={handleChange}>
            <option>Bác sĩ</option>
            <option>Giáo sư</option>
            <option>None</option>
          </select>

          

          <div></div>
          <button type="submit">Lưu người dùng</button>
        </form>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>FirstName</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">Không có người dùng nào.</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.firstName} {u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.firstName}</td>
                  <td>{u.address}</td>
                  <td>{u.phone}</td>
                  <td>{u.gender === 0 ? "Nam" : u.gender === 1 ? "Nữ" : "Khác"}</td>
                  <td>
                    {u.roleId === '1' ? 'Admin' : u.roleId === '2' ? 'Bác sĩ' : u.roleId === '3' ? 'Bệnh nhân' : 'Unknown Role'}
                  </td>
                  <td>
                    <button onClick={() => handleDelete(u.id)} className="btn-delete">
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
    </div>
  );
};

export default ManageUser;
