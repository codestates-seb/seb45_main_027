import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfoFollowList from "./UserInfoFollowList";
import { toast } from "react-hot-toast";
import axios from "axios";

const UserInfoFollow = () => {
  const [followingList, setFollowingList] = useState("");
  const [followersList, setFollowersList] = useState("");
  const baseURL = process.env.REACT_APP_API_URL;
  const { id } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  

  useEffect(() => { fetchData(); }, [id]);

  const fetchData = async () => {
    try {
      const [followingResponse, followersResponse] = await Promise.all([
        axios.get(`${baseURL}/follow/from/${id}`, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            "ngrok-skip-browser-warning": "69420",

          },
        }),
        axios.get(`${baseURL}/follow/to/${id}`, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            "ngrok-skip-browser-warning": "69420",
          },
        }),
      ]);

      setFollowingList(followingResponse.data.data);
      setFollowersList(followersResponse.data.data);

      //console.log("Following data.data", followingResponse.data.data);
      //console.log("Followers data.data", followersResponse.data.data);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const handleFollowAction = () => { fetchData();};

  // const handleUnfollow = (memberId, fromMemberId) => {
  //   const updatedFollowingList = followingList.filter(
  //     (user) => user.memberId !== memberId
  //   );
  //   setFollowingList(updatedFollowingList);

  //   const updatedFollowersList = followersList.map((user) => {
  //     if (user.fromMemberId === fromMemberId) {
  //       return {
  //         ...user,
  //         followYn: !user.followYn,
  //       };
  //     }
  //     return user;
  //   });
  //   setFollowersList(updatedFollowersList);
  //   toast.success("팔로우가 취소되었습니다!");
  //   console.log(`Unfollow user with ID ${memberId}`);
  // };

  // const handleFollow = (fromMemberId) => {
  //   const newFollowersList = followersList.map((user) => {
  //     if (user.fromMemberId === fromMemberId) {
  //       return {
  //         ...user,
  //         followYn: !user.followYn,
  //       };
  //     }
  //     return user;
  //   });
  //   setFollowersList(newFollowersList);
  //   toast.success("팔로우 되었습니다!");
  //   console.log(`Follow user with ID ${fromMemberId}`);
  // };

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
