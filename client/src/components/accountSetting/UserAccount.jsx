import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";

const UserAccount = ({ toggleAccountSettings, userDetails }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("editProfile");
  const toggleTab = (tabName) => {
    setActiveTab((prevtab) => (prevtab === tabName ? null : tabName));
  };

  //프로필정보 수정을 위한 state
  const [profileData, setProfileData] = useState({
    id: userDetails[0].id,
    username: userDetails[0].username,
    profilePicture: userDetails[0].profilePicture || null,
    bio: userDetails[0].bio || "",
  });

  //최종으로 수정된 프로필정보를 서버에 보냄
  const handleProfileUpdate = async () => {
    // const formData = {
    //   id: profileData.id,
    //   username: profileData.username,
    //   profilePicture: profileData.profilePicture,
    //   bio: profileData.bio,
    // };

    try {
      // 프로필데이터 보낼때 아이디도 같이 보내도 되는지 묻기, 아님 아이디 빼야됨
      const response = await axios.patch("/api/profile", profileData);
      console.log(response.data);
      alert("Profile updated!");
      navigate("/myinfo");
    } catch (error) {
      console.error(error);
      alert("Error updating profile");
      //중복 닉네임일 경우 요청받을거임
    }
    console.log(profileData);
  };

  const inputStyle =
    "px-4 py-3.5 my-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300 md:w-[400px]";
  const buttonStyle =
    "bg-[#14616e]/80 text-white text-lg font-medium rounded-full px-2 py-2 hover:bg-[#14616e]/60";
  const tabStyle =
    "bg-[#273a7e]/80 text-white text-xl font-medium rounded-lg px-2 py-2 mt-4 hover:bg-[#273a7e]/60";
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
          <DeleteAccount />
        </div>
        <div>
          <li className={tabStyle} onClick={() => toggleTab("editProfile")}>
            Edit Profile
          </li>

          {activeTab === "editProfile" && (
            <EditProfile
              profileData={profileData}
              setProfileData={setProfileData}
              buttonStyle={buttonStyle}
              fileInputStyle={fileInputStyle}
              inputStyle={inputStyle}
              handleProfileUpdate={handleProfileUpdate}
            />
          )}
        </div>
        <div>
          <li className={tabStyle} onClick={() => toggleTab("changePassword")}>
            Change Password
          </li>
          {/* 소셜로그인일 경우 비밀번호 변경 불가능하게 추후 변경예정 */}
          {activeTab === "changePassword" && (
            <ChangePassword inputStyle={inputStyle} buttonStyle={buttonStyle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
