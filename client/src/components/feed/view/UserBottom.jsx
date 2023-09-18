import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";

const buttonStyle = "flex items-center justify-center h-full";

const UserBottom = ({ feedData, setFollow, follow, res }) => {
  const memberId = localStorage.getItem("memberId");
  const frommemberId = feedData.memberId;
  const navigate = useNavigate();

  const [patchRes, patchErr, patchLoading, patchFetchData] = useAxios(
    {
      method: "PATCH",
      url: `/follow/choose/${frommemberId}/${memberId}`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    },
    false
  );

  if (res && res.data && res.data.data) {
    console.log(res.data.data);
    console.log(res.data.data.followYn);
  }

  const toggleFollow = () => {
    patchFetchData();
    setFollow(!follow);
  };

  useEffect(() => {
    if (res && res.data && res.data.data) {
      setFollow(res.data.data.followYn);
    }
  }, [res]);

  return (
    <div className="flex justify-between py-12 border-b">
      <div className="flex items-center">
        <div className="border w-16 h-16 rounded-full mr-4">
          <img
            src={`${feedData.memberImage}`}
            className="w-full h-full rounded-full object-cover cursor-pointer"
            onClick={() => {
              navigate(`/myinfo/${feedData.memberId}`);
            }}
            alt=""
          />
        </div>
        <div>
          <div className="flex items-center">
            <div
              onClick={() => {
                navigate(`/myinfo/${feedData.memberId}`);
              }}
              className="text-xl font-semibold cursor-pointer">
              {feedData.nickname}
            </div>
            <div className="flex items-center pr-2 pl-2.5 text-2xl">·</div>
            <button className="" onClick={toggleFollow}>
              {follow ? (
                <div className={buttonStyle}>
                  <img
                    src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/check.png"
                    alt="팔로잉"
                  />
                  <span className=" text-xl hover:text-gray-300 text-gray-600 font-semibold pl-1">
                    팔로잉
                  </span>
                </div>
              ) : (
                <div className={buttonStyle}>
                  <img
                    src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/plus.png"
                    alt="팔로우"
                  />
                  <span className="text-xl hover:text-[#96dbf0] text-[#35c5f0] font-semibold pl-1">
                    팔로우
                  </span>
                </div>
              )}
            </button>
          </div>
          <div className="text-xl text-gray-500">{feedData.myIntro}</div>
        </div>
      </div>
    </div>
  );
};

export default UserBottom;
