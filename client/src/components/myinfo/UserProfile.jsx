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
      className="flex justify-between md:flex-col md:justify-start md:items-center bg-white rounded-md
      my-[3%] w-full md:w-[180px] lg:w-[200px] xl:w-[230px]
      h-[100px] md:h-[630px] lg:h-[690px] xl:h-[750px]
     shadow-md md:my-[2%]"
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
