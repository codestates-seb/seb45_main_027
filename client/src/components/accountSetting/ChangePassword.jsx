import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const ChangePassword = ({ inputStyle, buttonStyle }) => {
  const navigate = useNavigate();
  const baseUrl = "https://beeb-210-123-100-75.ngrok-free.app";

  const [updatedPassword, setUpdatedPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPassword({ ...updatedPassword, [name]: value });
  };

  const handlePasswordUpdate = async () => {
    if (updatedPassword.newPassword !== updatedPassword.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      axios.post(`${baseUrl}/members/memberid수정필요/password`, {
        currentPassword: updatedPassword.currentPassword,
        newPassword: updatedPassword.newPassword,
      });
      alert("Password updated!");
      navigate("/myinfo");
    } catch (error) {
      console.error(error);
      alert("Error updating password");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[500px] pb-30">
      <input
        type="password"
        name="currentPassword"
        placeholder="Current Password"
        value={updatedPassword.currentPassword}
        onChange={handlePasswordChange}
        className={inputStyle}
      />
      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        value={updatedPassword.newPassword}
        onChange={handlePasswordChange}
        className={inputStyle}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={updatedPassword.confirmPassword}
        onChange={handlePasswordChange}
        className={inputStyle}
      />
      <button onClick={handlePasswordUpdate} className={`${buttonStyle} mt-10`}>
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
