import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const buttonStyle =
  "flex items-center justify-center rounded-lg shadow h-full px-5 py-4";
const div = "flex flex-col items-center px-6";
const img = "w-10 h-10 mb-2";

const ShowroomUserTop = ({ feedData, setFollow, follow, res }) => {
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

  let datePart = "";
  if (feedData && feedData.createdDateTime) {
    datePart = feedData.createdDateTime.split("T")[0];
  }

  if (res && res.data && res.data.data) {
    console.log(res.data);
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

  // 팔로우 받아온 요청 상태 저장
  useEffect(() => {
    if (feedData) {
      setFollow(feedData.followYn);
    }
  }, [feedData]);

  return (
    <div className="flex-col items-center lg:flex-row flex justify-between p-2 lg:p-8 mt-10 pt-10 rounded-lg shadow bg-white">
      <div className="flex items-center px-5">
        <div className="border w-12 h-12 rounded-full mr-4">
          <img
            onClick={() => {
              navigate(`/myinfo/${feedData.memberId}`);
            }}
            src={`${feedData.memberImage}`}
            alt="profileImg"
            className="w-10 h-10 mr-2.5 rounded-full object-cover cursor-pointer"
          />
        </div>
        <div>
          <div
            onClick={() => {
              navigate(`/myinfo/${feedData.memberId}`);
            }}
            className="text-lg font-semibold cursor-pointer">
            {feedData.nickname}
          </div>
          <div className="text-gray-500">{datePart}</div>
        </div>
      </div>
      <div className="flex pt-10 lg:pt-0">
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/city.png"
            alt="주거형태"
          />
          <span>{feedData.roomTypeName}</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/width.png "
            alt="공간"
          />
          <span>{feedData.roomInfoName}</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/door.png"
            alt="평수"
          />
          <span>{feedData.roomSizeName}</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/house.png "
            alt="방개수"
          />
          <span>{feedData.roomCountName}</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/local.png"
            alt="지역"
          />
          <span>{feedData.locationName}</span>
        </div>
      </div>
      <button className="h-full p-10" onClick={toggleFollow}>
        {follow ? (
          <div className={`bg-white ${buttonStyle} `}>
            <img
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/check.png"
              alt="팔로잉"
            />
            <span className=" text-gray-800 font-semibold pl-1">팔로잉</span>
          </div>
        ) : (
          <div className={`bg-[#00647B] ${buttonStyle} `}>
            <img
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/plus.png"
              alt="팔로우"
            />
            <span className="text-white font-semibold pl-1">팔로우</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ShowroomUserTop;
