import React from "react";
import { Link, useParams } from "react-router-dom";
import api from "../common/tokens";

const UserInfoFollowList = ({ userList, onFollowAction, activeTab }) => {
  const loggedinId = localStorage.getItem("memberId");
  const { id } = useParams();

  const handleFollow = async (fromMemberId, memberId) => {
    let url = "";
    if (id === loggedinId) {
      if (activeTab === "following") {
        url = `/follow/choose/${fromMemberId}/${memberId}`; //내계정 팔로잉리스트에서
      } else {
        url = `/follow/choose/${memberId}/${fromMemberId}`; //내계정 팔로워리스트에서
      }
    } else {
      if (activeTab === "following") {
        url = `/follow/choose/${loggedinId}/${memberId}`; //다른계정 팔로잉리스트에서
      } else {
        url = `/follow/choose/${loggedinId}/${fromMemberId}`; //다른계정 팔로워리스트에서
      }
    }

    try {
      await api.patch(url, {
        headers: {
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
          className="flex justify-between items-center px-4 md:pl-5 md:pr-3 mb-1.5 "
        >
            <img
              className="h-6 w-6 md:h-8 md:w-8 object-cover rounded-full"
              src={
                activeTab === "following"
                  ? user.memberImage || "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
                  : user.fromMemberImage || "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
              }
              alt={user.memberNickname}
            />
            <Link
              to={`/myinfo/${
                activeTab === "following" ? user.memberId : user.fromMemberId
              }`}
            >
              <button className="md:mx-2.5 text-xs md:text-sm font-md truncate overflow-hidden max-w-[85px]">
                {activeTab === "following"
                  ? user.memberNickname
                  : user.fromMemberNickname}
              </button>
            </Link>
          <button
            className="text-[6px] md:text-xs text-white font-bold"
            onClick={() => {
              handleFollow(user.fromMemberId, user.memberId);
            }}
          >
            <div className="bg-[#00647B]/80 rounded-full py-1 px-1.5">
              {user.followYn ? "Following" : "Follow"}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserInfoFollowList;
