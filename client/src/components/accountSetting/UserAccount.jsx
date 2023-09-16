import React, { useState } from "react";
import { useNavigate } from "react-router";
//import axios from "axios";
import api from "../common/tokens";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
import { toast } from "react-hot-toast";


const UserAccount = ({ toggleAccountSettings, userDetails }) => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");
  // const accessToken = localStorage.getItem("accessToken");
  // const baseURL = process.env.REACT_APP_API_URL;

  const [activeTab, setActiveTab] = useState("editProfile");
  const toggleTab = (tabName) => {
    setActiveTab((prevtab) => (prevtab === tabName ? null : tabName));
  };


  //프로필정보 수정을 위한 state
  const [profileData, setProfileData] = useState({
    nickname: userDetails.nickname,
    profileImg: userDetails.profileImg,
    myIntro: userDetails.myIntro,
  });

  //최종으로 수정된 프로필정보를 서버에 보냄
  const handleProfileUpdate = async () => {
    const hasSpaces = (value) => {
      return /\s/.test(value);
    };
    const nicknameValidation =
      profileData.nickname.trim().length >= 2 &&
      profileData.nickname.trim().length <= 10 &&
      !hasSpaces(profileData.nickname);

    if (!nicknameValidation) {
      toast.error("닉네임은 2글자에서 10글자 내로 지정 가능합니다");
      return;
    }

    try {
      // 닉네임 2글자 이상으로 유효성 넣기 아니면 안넘어가기
      await api.patch(
        `/members/${memberId}`,
        profileData,
        {
          headers: {
            //Authorization: accessToken ? `Bearer ${accessToken}` : "", 
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      localStorage.setItem("nickname", profileData.nickname);
     // localStorage.setItem("profileImg", profileData.profileImg);
      if (profileData.profileImg === null) {
        localStorage.setItem(
          "profileImg",
          "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
        );
      } else {
        localStorage.setItem("profileImg", profileData.profileImg);
      }
      
      // console.log(response.data);
      // console.log(profileData.profileImg);
      alert("Profile updated!");
      navigate("/");
    } catch (error) {
      console.error(error);
      // if (error.response.status === 400 && error.response.data.message) {
      //   alert("이미 등록된 닉네임입니다.");
      // }
      toast.error('프로필 업데이트에 실패했습니다')
      navigate("/");
      //alert("Error updating profile");
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
          <div className="text-3xl font-bold px-2 py-2">{`Hello, ${userDetails.nickname}`}</div>
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
