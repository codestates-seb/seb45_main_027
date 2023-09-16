import React from "react";
import UserProfileDetails from "./UserProfileDetails";
import UserInfoFollow from "./UserInfoFollow";

const UserProfile = ({
  toggleAccountSettings,
  profileData,
  followingList,
  followersList,
  fetchFollowData,
}) => {
  return (
    <div
      className="flex md:flex-col md:items-center bg-white rounded-md
     mr-[2%] my-[3%] w-full md:w-[35%] 2xl:w-[300px] h-[100px] md:h-[900px] shadow-md md:my-[2%]"
    >
      <UserProfileDetails
        toggleAccountSettings={toggleAccountSettings}
        profileData={profileData}
      />
      <UserInfoFollow
        followingList={followingList}
        followersList={followersList}
        fetchFollowData={fetchFollowData}
      />
    </div>
  );
};

export default UserProfile;
