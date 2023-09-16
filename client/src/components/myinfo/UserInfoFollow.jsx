import { useState } from "react";
import UserInfoFollowList from "./UserInfoFollowList";
// import { toast } from "react-hot-toast";

const UserInfoFollow = ({followingList, followersList, fetchFollowData}) => {

  const handleFollowAction = () => { fetchFollowData();};

  const [activeTab, setActiveTab] = useState("following");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="z-50">
      {followingList && followersList && <div className="flex flex-row md:justify-center p-2 mb-6 text-[#525252] font-medium">
        <button
          className={`flex items-center text-base ${
            activeTab === "following" ? "text-[#00647B]" : ""
          }`}
          onClick={() => handleTabChange("following")}
        >
          <div className="p-2 hover:rounded-full">Following</div>
          <div>{followingList.length}</div>
        </button>
        <button
          className={`flex items-center text-base ${
            activeTab === "followers" ? "text-[#00647B]" : ""
          }`}
          onClick={() => handleTabChange("followers")}
        >
          <div className="ml-4 p-2 hover:rounded-full">Followers</div>
          <div>{followersList.length}</div>
        </button>
      </div>}
      <div
        className="md:mb-10 md:h-[300px] overflow-auto xl:w-[250px] bg-white opacity-[90%]"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        {activeTab === "following" && followingList && (
          <UserInfoFollowList
            userList={followingList}
            activeTab={activeTab}
            onFollowAction={handleFollowAction}
          />
        )}
        {activeTab === "followers" && followersList && (
          <UserInfoFollowList
            userList={followersList}
            activeTab={activeTab}
            onFollowAction={handleFollowAction}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoFollow;
