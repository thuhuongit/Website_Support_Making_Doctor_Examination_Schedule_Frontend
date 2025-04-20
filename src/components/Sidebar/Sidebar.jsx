import './Sidebar.css';

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-user">
      <img src="/avatar.png" alt="Avatar" className="avatar" />
      <div>
        <p className="username">Admin Admin</p>
        <p className="role">ADMIN</p>
      </div>
    </div>
    <ul className="menu">
      <li>Dashboard</li>
      <li>Manage User</li>
      <li>Manage Doctor</li>
      <li className="active">Manage Health Examination Plan</li>
      <li>Manage Clinic</li>
      <li>Manage Specialty</li>
    </ul>
  </div>
);

export default Sidebar;
