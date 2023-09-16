import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import UserInfoFollowList from "./UserInfoFollowList";
import { toast } from "react-hot-toast";
//import axios from "axios";
//import api from "../common/tokens";

const UserInfoFollow = ({followingList, followersList, fetchFollowData}) => {
//   const [followingList, setFollowingList] = useState("");
//   const [followersList, setFollowersList] = useState("");
//   const baseURL = process.env.REACT_APP_API_URL;
//   const { id } = useParams();
//  // const accessToken = localStorage.getItem("accessToken");
  

//   useEffect(() => { fetchFollowData(); }, [id]);

//   const fetchFollowData = async () => {
//     try {
//       const [followingResponse, followersResponse] = await Promise.all([
//         api.get(`${baseURL}/follow/from/${id}`),
//         api.get(`${baseURL}/follow/to/${id}`, {
//           headers: {
//             //Authorization: accessToken ? `Bearer ${accessToken}` : "",
//             "ngrok-skip-browser-warning": "69420",
//           },
//         }),
//       ]);

//       setFollowingList(followingResponse.data.data);
//       setFollowersList(followersResponse.data.data);

//       // console.log("Following data", followingResponse.data);
//       // console.log("Following data.data", followingResponse.data.data);
//     } catch (err) {
//       console.error("Error: ", err);
//     }
//   };

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
