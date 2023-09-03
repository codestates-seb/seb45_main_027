import React, { useState } from "react";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";

const UserAccount = ({ toggleAccountSettings, userDetails }) => {
  const [profileData, setProfileData] = useState({
    id: userDetails[0].id,
    username: userDetails[0].username,
    profilePicture: userDetails[0].profilePicture || null,
    bio: userDetails[0].bio || "",
  });

  const [updatedPassword, setUpdatedPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [activeTab, setActiveTab] = useState("editProfile");

  const toggleTab = (tabName) => {
    setActiveTab((prevtab) => (prevtab === tabName ? null : tabName));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPassword({ ...updatedPassword, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfileData({ ...profileData, profilePicture: file });
    console.log(file);
  };

  const handleProfileUpdate = async () => {
    const formData = new FormData();
    formData.append("nickname", profileData.nickname);
    formData.append("newText", profileData.newText);
    formData.append("profilePicture", profileData.profilePicture);

    try {
      const response = await axios.put("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      alert("Profile updated!");
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
    }
    console.log(formData);
  };

  const handlePasswordUpdate = async () => {
    // axios.post("/api/password", { newPassword: profileData.newPassword });
    alert("Password updated!");
  };

  const handleAccountDeletion = async () => {
    // axios.delete("/api/account");
    alert("Account deleted!");
  };

  const inputStyle =
    "px-4 py-3.5 my-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 md:w-[400px]";
  const buttonStyle =
    "bg-[#14616e]/80 text-white text-lg font-medium rounded-full px-2 py-2 hover:bg-[#14616e]/60";
  const tabStyle =
    "bg-[#273a7e]/80 text-white text-xl font-medium rounded-lg px-2 py-2 mt-4 hover:bg-[#273a7e]/60";
  const deleteTabStyle =
    "bg-[#f50c1b]/80 text-white text-lg font-medium rounded-lg px-2 hover:bg-[#f50c1b]/60";
  const fileInputStyle = "hidden";

  return (
    <div>
      <button
        onClick={() => toggleAccountSettings(false)}
        className={`flex justify-center text-5xl text-[#404040] rounded-full p-4 mb-1 w-[50px] h-[50px]`}
      >
        &times;
      </button>
      <div className="flex flex-col container mx-auto p-4 bg-white opacity-[.9] rounded-lg min-w-[350px] md:min-w-[750px] mb-32">
        <div className="flex justify-between">
          <div className="text-3xl font-bold px-2 py-2">{`Hello, ${userDetails[0].username}`}</div>

          <button
            onClick={handleAccountDeletion}
            className={`${deleteTabStyle}`}
          >
            Delete Account
          </button>
        </div>
        <div>
          <li className={tabStyle} onClick={() => toggleTab("editProfile")}>
            Edit Profile
          </li>

          {activeTab === "editProfile" && (
            <EditProfile
              profileData={profileData}
              buttonStyle={buttonStyle}
              fileInputStyle={fileInputStyle}
              inputStyle={inputStyle}
              handleProfilePictureChange={handleProfilePictureChange}
              handleProfileChange={handleProfileChange}
              handleProfileUpdate={handleProfileUpdate}
            />
          )}
        </div>
        <div>
          <li className={tabStyle} onClick={() => toggleTab("changePassword")}>
            Change Password
          </li>

          {activeTab === "changePassword" && (
            <ChangePassword
              inputStyle={inputStyle}
              buttonStyle={buttonStyle}
              updatedPassword={updatedPassword}
              handlePasswordChange={handlePasswordChange}
              handlePasswordUpdate={handlePasswordUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
