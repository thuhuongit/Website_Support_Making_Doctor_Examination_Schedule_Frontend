import React, { useEffect, useState } from "react";
import "./DoctorSidebar.css";

const DoctorSidebar = () => {
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.image && user.image.type === "Buffer" && Array.isArray(user.image.data)) {
      const buffer = new Uint8Array(user.image.data);
      user.image = new TextDecoder().decode(buffer); 
    }
      setDoctorInfo(user);
    }
  }, []);

  return (
    <div className="sidebar">
      <div className="profile">
        {doctorInfo && doctorInfo.image ? (
          <img
            src={
              doctorInfo.image.startsWith("data:image")
                ? doctorInfo.image
                : `http://localhost:8084${doctorInfo.image}`
            }
            alt="Doctor"
            className="avatar"
          />
        ) : (
          <img src="/default-avatar.png" alt="avatar" className="avatar" />
        )}

        <p className="name">
          Xin chào,{" "}
          {doctorInfo
            ? `${doctorInfo.lastName || ""} ${doctorInfo.firstName || ""}`
            : "Loading..."}
        </p>
        <p className="role">DOCTOR</p>
      </div>

      <nav className="nav">
        <ul>
          <li className="active">Manage Doctor's Patient</li>
        </ul>
      </nav>
    </div>
  );
};

export default DoctorSidebar;
