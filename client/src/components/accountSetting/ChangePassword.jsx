import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
//import { useAuth } from "../../context/AuthContext"


const ChangePassword = ({ inputStyle, buttonStyle }) => {
  //const { user } = useAuth();
  //console.log(user);

  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");
  //const baseUrl = "http://ec2-3-39-231-102.ap-northeast-2.compute.amazonaws.com:8080";

  const baseUrl = process.env.REACT_APP_API_URL;

  const [updatedPassword, setUpdatedPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPassword({ ...updatedPassword, [name]: value });
  };

  const hasSpaces = (value) => {
    return /\s/.test(value);
  };
  
  const isPasswordValid = !hasSpaces(updatedPassword.newPassword) &&
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&()+|=])[A-Za-z\d~!@#$%^&()+|=]{6,15}$/.test(
      updatedPassword.newPassword
    ); 


  const handlePasswordUpdate = async () => {

    if (!isPasswordValid) {
      alert("비밀번호는 6글자 이상 15글자 이하로 입력해주세요. 영문, 숫자, 특수문자가 반드시 포함되어야 하며 공백은 사용할 수 없습니다.");
      return;
    }

    if (updatedPassword.newPassword !== updatedPassword.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
     await axios.patch(`${baseUrl}/members/${memberId}/password`, {
        password: updatedPassword.currentPassword,
        newPassword: updatedPassword.newPassword,
      });
      console.log(updatedPassword.newPassword);
      alert("Password updated!");
      navigate("/login");
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
