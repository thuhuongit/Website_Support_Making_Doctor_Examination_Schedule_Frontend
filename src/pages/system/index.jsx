import { useEffect, useState } from "react";
import { userService } from "../../services/userService";  // Import API userService
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from "react-modal";




Modal.setAppElement("#root");

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null); // Đúng: Lưu user cần chỉnh sửa
  const [isEditMode, setIsEditMode] = useState(false); // Kiểm tra chế độ chỉnh sửa
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    gender: "Male",
  })
  const handleEditClick = (user) => {
    setEditUser(user);       
    setIsEditMode(true);     
    setIsModalOpen(true);    
  };

  

    //  Load danh sách người dùng
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
  
    //  Xử lý thay đổi input
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewUser(prev => ({
          ...prev,
          [name]: value ?? ""  // ✅ Đảm bảo luôn có giá trị
      }));
  };
  
    // Thêm người dùng
    const handleSaveUser = async () => {
      console.log("User mới:", newUser);
    
      if (!newUser.email || !newUser.firstName || !newUser.lastName ) {
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
    
          // ✅ Cập nhật danh sách từ API thay vì chỉ thêm vào state
          fetchUsers();  
    
        } else {
          alert("Lỗi từ server: " + response.message);
        }
      } catch (error) {
        console.error("Lỗi khi thêm user:", error);
        alert("Không thể thêm người dùng! Kiểm tra console.");
      }
    
      setNewUser({ email: "", firstName: "", lastName: "", address: "", phoneNumber: "", gender: "Male" });
    };
    
  
    // Xóa người dùng
    const handleDeleteUser = async (userId) => {
      if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
        return;
      }
    
      try {
        const response = await userService.deleteUser(userId);
        if (response.errCode === 0) {
          alert("Xóa người dùng thành công!");
    
          // Xóa user ngay trong state mà không cần fetch lại API
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        } else {
          alert("Lỗi từ server: " + response.message);
        }
      } catch (error) {
        console.error("Lỗi khi xóa user:", error);
        alert("Không thể xóa người dùng!");
      }
    };


    const handleEditInputChange = (e) => { 
      console.log (e.target); 
      const { name, value } = e.target;
      setEditUser(prev => ({
          ...prev,
          [name]: value ?? ""  // ✅ Đảm bảo không bị undefined
      }));
  };
  
    
  
    //  Chỉnh sửa người dùng
    const handleEditUser = async () => {
      // console.log("First Name:", firstName);
      // console.log("Last Name:", lastName);
      // console.log("Address:", address);
      // console.log("Phone:", phonenumber);
      // console.log("Gender:", gender);
       console.log (editUser);
      // if (!editUser.id || !editUser.firstName || !editUser.lastName || !editUser.phonenumber || !editUser.gender){
      //     alert("Vui lòng nhập đầy đủ thông tin!");
      //     return;
      // }
  
      try {
          console.log("Gửi dữ liệu cập nhật:", editUser);
          const response = await userService.updateUser(editUser);  // ✅ Đảm bảo gọi đúng hàm
          console.log("Phản hồi API:", response);
  
          if (response.errCode === 0) {
              alert("Cập nhật thành công!");
              setIsModalOpen(false);
              setIsEditMode(false);
              fetchUsers();  // Cập nhật lại danh sách
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
        <h2 className="text-xl font-bold mb-4">{isEditMode ? "Edit User" : "Add New User"}</h2>

        <input type="text" name="email" placeholder="Email" value={isEditMode ? editUser?.email : newUser.email} onChange={isEditMode ? handleEditInputChange : handleInputChange} className="input-field" disabled={isEditMode} />

        <input type="text" name="firstName" placeholder="First Name" value={isEditMode ? editUser?.firstName : newUser.firstName} onChange={isEditMode ? handleEditInputChange : handleInputChange} className="input-field" />

        <input type="text" name="lastName" placeholder="Last Name" value={isEditMode ? editUser?.lastName : newUser.lastName} onChange={isEditMode ? handleEditInputChange : handleInputChange} className="input-field" />

        <input type="text" name="address" placeholder="Address" value={isEditMode ? editUser?.address : newUser.address} onChange={isEditMode ? handleEditInputChange : handleInputChange} className="input-field" />

        <input type="number" name="phoneNumber" placeholder="Phone Number" value={isEditMode ? editUser?.phoneNumber : newUser.phoneNumber} onChange={isEditMode ? handleEditInputChange : handleInputChange} className="input-field" />

        <select name="gender" value={isEditMode ? editUser?.gender : newUser.gender} onChange={isEditMode ? handleEditInputChange : handleInputChange} className="input-field">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
        </select>

        <div className="modal-buttons">
        {isEditMode ? (
      <button className="save-btn" onClick={handleEditUser}>Update</button>
    ) : (
      <button className="save-btn" onClick={handleSaveUser}>Save</button>
    )}
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
                    <button type="button" onClick={() => handleEditClick(user)} className="btn-edit"><i className="fa-solid fa-pencil"></i></button>
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
