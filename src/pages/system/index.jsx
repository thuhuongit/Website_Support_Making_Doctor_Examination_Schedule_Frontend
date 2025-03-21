import { useEffect, useState } from "react";
import { userService } from "../../services/userService";  // Import API userService
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from "react-modal";




Modal.setAppElement("#root");

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null); // Lưu user cần sửa
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    gender: "Male",
  })

    // 🔄 Load danh sách người dùng
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers("all");
        if (response.errCode === 0 && response.users) {
          setUsers(response.users);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách user:", error);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    // 🎯 Xử lý thay đổi input
    const handleInputChange = (e) => {
      setNewUser({ 
        ...newUser, 
        [e.target.name]: e.target.value 
      });
    };
  
    // ✅ Thêm người dùng
    const handleSaveUser = async () => {
      console.log("User mới:", newUser);
  
      if (!newUser.email || !newUser.firstName || !newUser.lastName) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }
  
      try {
          console.log("Dữ liệu gửi API:", newUser); 
          const response = await userService.createUser(newUser);
          console.log("API response:", response); 
  
          if (response.errCode === 0) {
              alert("Thêm người dùng thành công!");
              setIsModalOpen(false);
  
              // Cập nhật danh sách ngay lập tức bằng cách thêm user mới vào đầu mảng
              setUsers(prevUsers => [newUser, ...prevUsers]);
  
          } else {
              alert("Lỗi từ server: " + response.message);
          }
      } catch (error) {
          console.error("Lỗi khi thêm user:", error);
          alert("Không thể thêm người dùng! Kiểm tra console.");
      }
  
      setNewUser({ email: "", firstName: "", lastName: "", address: "", phoneNumber: "", gender: "Male" });
  };
  
    // ❌ Xóa người dùng
    const handleDeleteUser = async (userId) => {
      if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
        return;
      }
  
      try {
        const response = await userService.deleteUser(userId);
        if (response.errCode === 0) {
          alert("Xóa người dùng thành công!");
          fetchUsers(); // Lấy danh sách mới
        } else {
          alert("Lỗi từ server: " + response.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa user:", error);
        alert("Không thể xóa người dùng!");
      }
    };
  
    // ✏️ Chỉnh sửa người dùng
    const handleEditClick = (user) => {
      setEditUser(user);
      setIsModalOpen(true);
    };
  
    const handleEditInputChange = (e) => {
      setEditUser({
        ...editUser,
        [e.target.name]: e.target.value
      });
    };
  
    const handleUpdateUser = async () => {
      if (!editUser.firstName || !editUser.lastName) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }
  
      try {
        const response = await userService.updateUser(editUser);
        if (response.errCode === 0) {
          alert("Cập nhật thành công!");
          setIsModalOpen(false);
          fetchUsers(); // Cập nhật danh sách từ API
        } else {
          alert("Lỗi từ server: " + response.message);
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật user:", error);
        alert("Không thể cập nhật người dùng!");
      }
    };


  return (
    <div className="users-container">
      <h1 className="title text-center">Manage users with Huong</h1>
      <div className="mx-1">
        <button className="add-user-btn" onClick={() => setIsModalOpen(true)} ><i className="fa-solid fa-plus"></i> Add new users</button>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal-content" overlayClassName="modal-overlay">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>

        <input type="text" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} className="input-field" />
      

        <input type="text" name="firstName" placeholder="First Name" value={newUser.firstName} onChange={handleInputChange} className="input-field" />

        <input type="text" name="lastName" placeholder="Last Name" value={newUser.lastName} onChange={handleInputChange} className="input-field" />

        <input type="text" name="address" placeholder="Address" value={newUser.address} onChange={handleInputChange} className="input-field" />

        <input type="text" name="phoneNumber" placeholder="Phone Number" value={newUser.phoneNumber} onChange={handleInputChange} className="input-field" />

        <select name="gender" value={newUser.gender} onChange={handleInputChange} className="input-field">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <div className="modal-buttons">
          <button className="save-btn" onClick={handleSaveUser}>Save</button>
          <button className="close-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      </Modal>


      <div className="users-table">
        <table id="customers">
          <thead>
            <tr>
              <th>Email</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Address</th>
              <th>PhoneNumber</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users?.map((user, index) => (
                <tr key={user?.id || index}>
                  <td>{user?.email}</td>
                  <td>{user?.firstName}</td>
                  <td>{user?.lastName}</td>
                  <td>{user?.address}</td>
                  <td>{user?.phoneNumber}</td>
                  <td>{user?.gender}</td>
                  <td>
                    <button className="btn-edit"><i className="fa-solid fa-pencil"></i></button>
                    <button  onClick={() => handleDeleteUser(user.id)} className="btn-delete"><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default Dashboard;
