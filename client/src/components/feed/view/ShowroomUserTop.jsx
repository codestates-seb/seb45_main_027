import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/userContext";

const button =
  "flex items-center justify-center rounded-lg shadow h-full px-5 py-4";
const div = "flex flex-col items-center px-6";
const img = "w-10 h-10 mb-2";

const ShowroomUserTop = ({ feedData }) => {
  const { follow, setFollow, toggleFollow } = useUserContext();
  const navigate = useNavigate();

  let datePart = "";
  if (feedData && feedData.createdDateTime) {
    datePart = feedData.createdDateTime.split("T")[0];
  }

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
          <div className={`bg-gray-200 hover:bg-gray-300 ${button} `}>
            <img
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/check.png"
              alt=""
            />
            <span className=" text-gray-800 font-semibold pl-1">팔로잉</span>
          </div>
        ) : (
          <div className={`bg-[#00647B] hover:bg-[#3b98ad] ${button} `}>
            <img
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/plus.png"
              alt=""
            />
            <span className="text-white font-semibold pl-1">팔로우</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ShowroomUserTop;
