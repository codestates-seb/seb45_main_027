import React, { useState } from "react";
import MyInfoContentList from "./MyInfoContentList";
import UserProfile from "./UserProfile";
import UserAccount from "../accountSetting/UserAccount";

const MyInfoLayout = () => {
  const [showAccountSettings, setShowAccountSettings] = useState(false);

  const toggleAccountSettings = (isOpen) => {
    setShowAccountSettings(isOpen);
  };

  const userDetails = [
    {
      id: 1,
      username: "pepe",
      bio: "DIY 좋아합니다",
      profilePicture: "./images/Yebin.png",
    },
  ];

  return (
    <div>
      <div className="flex flex-col justify-center mb-[10%] mx-4 md:w-[95%] md:flex-row">
        {!showAccountSettings && (
          <>
            <UserProfile
              toggleAccountSettings={toggleAccountSettings}
              userDetails={userDetails}
            />
            <MyInfoContentList />
          </>
        )}
      </div>
      {showAccountSettings && <UserAccount toggleAccountSettings={toggleAccountSettings} userDetails={userDetails}/>}
    </div>
  );
};

export default MyInfoLayout;
