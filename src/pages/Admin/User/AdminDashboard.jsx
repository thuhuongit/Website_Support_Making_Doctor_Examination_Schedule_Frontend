import { FaUpload, FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import axiosInstance from "../../../util/axios";

const Sidebar = () => (
  <div className="sidebar">
    <div className="user-info">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" />
      <div>
        <p><strong>Admin Admin</strong></p>
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

  const [users, setUsers] = useState([]); // Example for users list, you would typically fetch this from your backend.

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axiosInstance.get("http://localhost:8081/api/get-all-users?id=all")
      .then(res => {
        console.log("Users data: ", res.data.users);  // Kiểm tra dữ liệu trả về
        const userList = res.data.users || []; // fallback về mảng rỗng nếu null
        setUsers(userList);
      })
      .catch(err => {
        console.error("Error fetching users: ", err);
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
    
    try {
      const res = await axiosInstance.post("http://localhost:8081/api/create-new-user", formData);
      
      if (res.data && res.data.errCode === 0) {
        alert("Tạo người dùng thành công!");
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
  
        // Fetch lại danh sách người dùng sau khi tạo thành công
        fetchUsers();
      } else {
        alert("Lỗi: " + res.data.errMessage);
      }
    } catch (error) {
      console.error(error);
      alert("Đã có lỗi xảy ra khi tạo người dùng.");
    }
  };
  

 
  

  const handleDelete = async (userId) => {
    try {
      // Gọi API để xóa người dùng
      const response = await axiosInstance.delete("http://localhost:8081/api/delete-user", {
        data: { id: userId }
      });
  
      if (response.data.errCode === 0) {
        alert("User deleted successfully");
        fetchUsers(); // Lấy lại danh sách người dùng sau khi xóa
      } else {
        alert("Error: " + response.data.errMessage);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
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

          <label>
            <FaUpload style={{ display: "inline-block", marginRight: "6px" }} />
            <input type="file" style={{ display: "none" }} />
            Tải ảnh
          </label>

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
  {console.log('User Role:', u.roleId)}  {/* Log giá trị roleId trả về */}
  {
    u.roleId === '1' ? 'Admin' : 
    u.roleId === '2' ? 'Bác sĩ' : 
    u.roleId === '3' ? 'Bệnh nhân' : 
    'Unknown Role'
  }
</td>

          <td>
            <button onClick={() => handleDelete(u.id)} className="btn-delete">
              <i className="fa-solid fa-trash"></i>
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default ManageUser;
