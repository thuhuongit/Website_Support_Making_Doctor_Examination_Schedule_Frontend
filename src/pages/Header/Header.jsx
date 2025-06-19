import { useEffect, useState } from "react";
import { userService } from "../../services/userService"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from "react-modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import "./Header.css";




Modal.setAppElement("#root");

const Header = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null); 
  const [isEditMode, setIsEditMode] = useState(false); 
  const [newUser, setNewUser] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
  })
  const handleEditClick = (user) => {
    setEditUser(user);       
    setIsEditMode(true);     
    setIsModalOpen(true);    
  };
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev,
      [name]: value ?? "" 
    }));
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
          [name]: value ?? ""  
      }));
  };
  
    // Thêm người dùng
    const handleSaveUser = async () => {
      console.log("User mới:", newUser);
    
      if (!newUser.email || !newUser.firstName || !newUser.lastName) {
        toast.error("⚠ Vui lòng nhập đầy đủ thông tin!", { position: "top-right" });
        return;
      }
    
      try {
        console.log("Dữ liệu gửi API:", newUser);
        const response = await userService.createUser(newUser);
        console.log("API response:", response);
    
        if (response.errCode === 0) {
          toast.success(" Thêm người dùng thành công!", { position: "top-right" });
          setIsModalOpen(false);
          fetchUsers();  
        } else {
          toast.error(" " + response.message, { position: "top-right" });
        }
      } catch (error) {
        console.error("Lỗi khi thêm user:", error);
        toast.error(" Không thể thêm người dùng!", { position: "top-right" });
      }
    
      setNewUser({ email: "", firstName: "", lastName: "", address: "" });
    };
    
  
    // Xóa người dùng
    const handleDeleteUser = async (userId) => {
      Swal.fire({
        title: "Bạn có chắc chắn muốn xóa?",
        text: "Hành động này không thể hoàn tác!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await userService.deleteUser(userId);
            if (response.errCode === 0) {
              toast.success("Xóa người dùng thành công!", { position: "top-right" });
              setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
            } else {
              toast.error(response.message, { position: "top-right" });
            }
          } catch (error) {
            console.error("Lỗi khi xóa user:", error);
            toast.error("Không thể xóa người dùng!", { position: "top-right" });
          }
        }
      });
    };
    
    //  Chỉnh sửa người dùng
    const handleEditUser = async () => {
      console.log(editUser);
    
      try {
        console.log("Gửi dữ liệu cập nhật:", editUser);
        const response = await userService.updateUser(editUser);
        console.log("Phản hồi API:", response);
    
        if (response.errCode === 0) {
          toast.success(" Cập nhật người dùng thành công!", { position: "top-right" });
          setIsModalOpen(false);
          setIsEditMode(false);
          fetchUsers();
        } else {
          toast.error(" " + response.message, { position: "top-right" });
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật user:", error);
        toast.error("⚠ Không thể cập nhật người dùng!", { position: "top-right" });
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
{/* 
        <input type="number" name="phone" placeholder="Phone Number" value={isEditMode ? editUser?.phone : newUser.phone} onChange={isEditMode ? handleEditInputChange : handleInputChange} className="input-field" />

        <select name="gender" value={isEditMode ? editUser?.gender : newUser.gender} onChange={isEditMode ? handleEditInputChange : handleInputChange} className="input-field">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
        </select> */}

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


export default Header;
