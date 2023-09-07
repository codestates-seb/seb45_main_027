import React from "react";

const ChangePassword = ({
  updatedPassword,
  handlePasswordChange,
  handlePasswordUpdate,
  inputStyle,
  buttonStyle,
}) => {
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
