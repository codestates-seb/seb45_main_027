import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../common/tokens";
import toast from "react-hot-toast";

const UserInfoFollowList = ({ userList, onFollowAction, activeTab }) => {
  const loginMemberId = localStorage.getItem("memberId");
  const loggedinId = localStorage.getItem("memberId");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleFollow = async (fromMemberId, memberId) => {
    // 비회원인지 여부 판단
    if (!loginMemberId) {
      toast.error("로그인이 필요한 서비스 입니다.");
      navigate("/login");
      return;
    }

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
      const res = await api.patch(url, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      if (res.data.data.followYn === true) {
        toast.success("팔로우에 등록하였습니다.");
      } else {
        toast.error("팔로우를 취소하였습니다.");
      }
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
                ? user.memberImage ||
                  "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
                : user.fromMemberImage ||
                  "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
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
            <span className="bg-[#00647B]/80 rounded-full p-[2px] md:p-1.5">
              {user.followYn ? "UnFollow" : "Follow"}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserInfoFollowList;
