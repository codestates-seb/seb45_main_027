import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserInfoFollowList from "./UserInfoFollowList";
import { toast } from "react-hot-toast";
import axios from "axios";

const UserInfoFollow = () => {

  const [followingList, setFollowingList] = useState('');
  const [followersList, setFollowersList] = useState('');
  const baseURL = process.env.REACT_APP_API_URL;
  const loggedinId = localStorage.getItem("memberId");
  const { id } = useParams();

  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {

    const fetchFollowingData = async () => {
      try {

        const response = await axios.get(`${baseURL}/follow/from/${loggedinId}`, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '', 
          },});

        setFollowingList(response.data.data);
         console.log('following data.data',response.data.data)
      } catch (err) {
        // console.log("Error: ", err);
      }
    };
    fetchFollowingData();
  }, []);

  useEffect(() => {
    const fetchFollowersData = async () => {
      try {

        const response = await axios.get(`${baseURL}/follow/to/${loggedinId}`, {
          headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : '', 
          },});

        setFollowersList(response.data.data);
        console.log('followers data.data',response.data.data)
      } catch (err) {
        // console.log("Error: ", err);
      }
    };   fetchFollowersData();
  }, []);


  const handleUnfollow = (memberId, fromMemberId) => {
    const updatedFollowingList = followingList.filter(
      (user) => user.memberId !== memberId
    );
    setFollowingList(updatedFollowingList);

    const updatedFollowersList = followersList.map((user) => {
      if (user.fromMemberId === fromMemberId) {
        return {
          ...user,
          followYn: !user.followYn,
        };
      }
      return user;
    });
    setFollowersList(updatedFollowersList);
    toast.success("팔로우가 취소되었습니다!");
    console.log(`Unfollow user with ID ${memberId}`);
  };

  const handleFollow = (fromMemberId) => {
    const newFollowersList = followersList.map((user) => {
      if (user.fromMemberId === fromMemberId) {
        return {
          ...user,
          followYn: !user.followYn,
        };
      }
      return user;
    });
    setFollowersList(newFollowersList);
    toast.success("팔로우 되었습니다!");
    console.log(`Follow user with ID ${fromMemberId}`);
  };

  const [activeTab, setActiveTab] = useState("following");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if(!followingList && !followersList) {return <div>loading...</div>};

  return (
    <div className="z-50">
      <div className="flex flex-row md:justify-center p-2 mb-6 text-[#525252] font-medium">
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
      </div>
      <div
        className="md:mb-10 md:h-[300px] overflow-auto xl:w-[250px] bg-white opacity-[90%]"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        {activeTab === "following" && followingList && (
          <UserInfoFollowList
            userList={followingList}
            handleUnfollow={(memberId) => handleUnfollow(memberId)}
            handleFollow={(memberId) => handleFollow(memberId)}
            activeTab={activeTab}
          />
        )}
        {activeTab === "followers" && followersList && (
          <UserInfoFollowList
            userList={followersList}
            handleUnfollow={(fromMemberId) => handleUnfollow(fromMemberId)}
            handleFollow={(fromMemberId) => handleFollow(fromMemberId)}
            activeTab={activeTab}
          />
        )}
      </div>
    </div>
  );
};

export default UserInfoFollow;
