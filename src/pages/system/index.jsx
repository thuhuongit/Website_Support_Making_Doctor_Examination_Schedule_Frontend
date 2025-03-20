import { useEffect, useState } from "react";
import { userService } from "../../services/userService";  // Import API userService
import '@fortawesome/fontawesome-free/css/all.min.css';


const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const id = "all"; // hoặc truyền id cụ thể
      const response = await userService.getAllUsers(id);
      console.log("Users API response:", response);

      if (response.errCode === 0 && response.users) {

        setUsers(response.users);
          
        }
        
      
      };

    fetchUsers();
  }, []);




  return (
    <div className="users-container">
      <h1 className="title text-center">Manage users with Huong</h1>
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
              users.map((user, index) => (
                <tr key={user.id || index}>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.address}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.gender}</td>
                  <td>
                    <button className="btn-edit"><i className="fa-solid fa-pencil"></i></button>
                    <button className="btn-delete"><i className="fa-solid fa-trash"></i></button>
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
