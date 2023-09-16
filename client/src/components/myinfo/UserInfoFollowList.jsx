//import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";
import api from "../common/tokens";

const UserInfoFollowList = ({ userList, onFollowAction, activeTab }) => {
  //const accessToken = localStorage.getItem("accessToken");
  const loggedinId = localStorage.getItem("memberId");
  const { id } = useParams();

  const handleFollow = async (fromMemberId, memberId) => {
    let url = "";
    if (id === loggedinId) {
      if (activeTab === "following") {
        url = `${process.env.REACT_APP_API_URL}/follow/choose/${fromMemberId}/${memberId}`; //내계정 팔로잉리스트에서
      } else {
        url = `${process.env.REACT_APP_API_URL}/follow/choose/${memberId}/${fromMemberId}`; //내계정 팔로워리스트에서
      }
    } else {
      if (activeTab === "following") {
        url = `${process.env.REACT_APP_API_URL}/follow/choose/${loggedinId}/${memberId}`; //다른계정 팔로잉리스트에서
      } else {
        url = `${process.env.REACT_APP_API_URL}/follow/choose/${loggedinId}/${fromMemberId}`; //다른계정 팔로워리스트에서
      }
    }

    try {
      await api.patch(url, {
        headers: {
          //Authorization: accessToken ? `Bearer ${accessToken}` : "",
          "ngrok-skip-browser-warning": "69420",
        },
      });

      onFollowAction();
    } catch {
      console.log("error");
    }
  };

  return (
    <div>
      {userList.map((user) => (
        <div
          key={activeTab === "following" ? user.memberId : user.fromMemberId}
          className="flex justify-between pl-5 pr-3 mb-1.5 "
        >
          <div className="flex">
            <img
              className="h-12 w-12 object-cover rounded-full"
              src={
                activeTab === "following"
                  ? user.memberImage || "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
                  : user.fromMemberImage || "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
              }
              // profileData.profileImg
              //   ? profileData.profileImg
              //   : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
              alt={user.memberNickname}
            />
            <Link
              to={`/myinfo/${
                activeTab === "following" ? user.memberId : user.fromMemberId
              }`}
            >
              <button className="mx-2.5 font-md truncate overflow-hidden max-w-[85px]">
                {activeTab === "following"
                  ? user.memberNickname
                  : user.fromMemberNickname}
              </button>
            </Link>
          </div>
          <button
            className="text-xs text-white font-bold"
            onClick={() => {
              handleFollow(user.fromMemberId, user.memberId);
            }}
          >
            <span className="bg-[#00647B]/80 rounded-full p-1.5">
              {user.followYn ? "Following" : "Follow"}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserInfoFollowList;
