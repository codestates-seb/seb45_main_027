import React from "react";
import UserProfileDetails from "./UserProfileDetails";
import UserInfoFollowList from "./UserInfoFollowList";

const UserProfile = () => {
  return (
    <div className="flex md:flex-col md:items-center bg-white rounded-md mr-[3%] my-[3%] w-full md:w-[22%] md:h-[50%] shadow-md md:my-[2%]">
      <UserProfileDetails />
      <UserInfoFollowList />
    </div>
  );
};

export default UserProfile;
