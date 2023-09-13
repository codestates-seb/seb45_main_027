import React from "react";
import UserProfileDetails from "./UserProfileDetails";
import UserInfoFollow from "./UserInfoFollow";

const UserProfile = ({ toggleAccountSettings, userDetails }) => {
  return (
    <div className="flex md:flex-col md:items-center bg-white rounded-md mr-[3%] my-[3%] w-full md:w-[22%] h-[100px] md:h-[900px] shadow-md md:my-[2%]">
      <UserProfileDetails
        toggleAccountSettings={toggleAccountSettings}
        userDetails={userDetails}
      />
      <UserInfoFollow />
    </div>
  );
};

export default UserProfile;
