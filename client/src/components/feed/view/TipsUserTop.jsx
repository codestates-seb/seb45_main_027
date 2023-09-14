import React from "react";
import { useUserContext } from "../../../context/userContext";

const buttonStyle =
  "flex items-center justify-center rounded-lg shadow w-32 h-full";
  
const TipsUserTop = ({ feedData }) => {
  const { follow, setFollow, toggleFollow } = useUserContext();

  let datePart = "";
  if (feedData && feedData.createdDateTime) {
    datePart = feedData.createdDateTime.split("T")[0];
  }

  return (
    <div className="flex justify-between pt-20">
      <div className="flex items-center">
        <div className="border w-12 h-12 rounded-full mr-4">
          <img src={`${feedData.memberImage}`} alt="" />
        </div>
        <div>
          <div className="text-lg font-semibold">{feedData.nickname}</div>
          <div className="text-gray-500">{datePart}</div>
        </div>
      </div>
      <button onClick={toggleFollow}>
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

export default TipsUserTop;
