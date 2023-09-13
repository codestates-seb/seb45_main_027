import React, { useState, useEffect } from "react";
import MyInfoContentList from "./MyInfoContentList";
import UserProfile from "./UserProfile";
import UserAccount from "../accountSetting/UserAccount";
import axios from "axios";

const MyInfoLayout = () => {
  const baseURL = process.env.REACT_APP_API_URL;
  const memberId = localStorage.getItem("memberId");

  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const toggleAccountSettings = (isOpen) => {
    setShowAccountSettings(isOpen);
  };

  // const userDetails = [
  //   {
  //     id: 1,
  //     username: "pepe",
  //     bio: "DIY 좋아합니다",
  //     profileImg:
  //       "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/Yebin.png",
  //   },
  // ];


  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${baseURL}/members/${memberId}`, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '', // Include the access token if it exists
          },});

        setProfileData(response.data.data);
        //console.log("Data: ", data);
        console.log('profile res',response);
        console.log('profile data.data',response.data.data)
      } catch (err) {
        console.log("Error: ", err);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center mb-[10%] px-4 w-full md:flex-row">
        {!showAccountSettings && (
          <>
            <UserProfile
              toggleAccountSettings={toggleAccountSettings}
              //userDetails={userDetails}
              profileData={profileData}
            />
            <MyInfoContentList />
          </>
        )}
      </div>
      {showAccountSettings && (
        <UserAccount
          toggleAccountSettings={toggleAccountSettings}
          //userDetails={userDetails}
          userDetails={profileData}
        />
      )}
    </div>
  );
};

export default MyInfoLayout;
