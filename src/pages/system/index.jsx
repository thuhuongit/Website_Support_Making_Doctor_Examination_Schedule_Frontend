import { useEffect, useState } from "react";
import { userService } from "../../services/userService";  // Import API userService


const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const id = "all"; // hoặc truyền id cụ thể
      const response = await userService.getAllUsers(id);
      console.log("📌 Users API response:", response);

      if (response.errCode === 0) {
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
    <tr>
      <th>Email</th>
      <th>Firtname</th>
      <th>Lastname</th>
      <th>Address</th>
      <th>PhoneNumber</th>
      <th>Gender</th>
      <th>Action</th>

    </tr>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Berglunds snabbköp</td>
      <td>Christina Berglund</td>
      <td>Sweden</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
    <tr>
      <td>Ernst Handel</td>
      <td>Roland Mendel</td>
      <td>Austria</td>
    </tr>
    <tr>
      <td>Island Trading</td>
      <td>Helen Bennett</td>
      <td>UK</td>
    </tr>
    <tr>
      <td>Königlich Essen</td>
      <td>Philip Cramer</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Laughing Bacchus Winecellars</td>
      <td>Yoshi Tannamuri</td>
      <td>Canada</td>
    </tr>
    <tr>
      <td>Magazzini Alimentari Riuniti</td>
      <td>Giovanni Rovelli</td>
      <td>Italy</td>
    </tr>
    <tr>
      <td>North/South</td>
      <td>Simon Crowther</td>
      <td>UK</td>
    </tr>
    <tr>
      <td>Paris spécialités</td>
      <td>Marie Bertrand</td>
      <td>France</td>
    </tr>
  </table>
  </div>
  </div>

  );
};

export default Dashboard;
