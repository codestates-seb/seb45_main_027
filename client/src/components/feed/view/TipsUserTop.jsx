import React, { useState } from "react";

const buttonStyle =
  "flex items-center justify-center rounded-lg shadow w-32 h-full";

const TipsUserTop = () => {
  const [follow, setFollow] = useState(false);

  return (
    <div className="flex justify-between pt-20">
      <div className="flex items-center">
        <div className="border w-12 h-12 rounded-full bg-red-500 mr-4" />
        <div>
          <div className="text-lg font-semibold">유저이름</div>
          <div className="text-gray-500">게시 날짜</div>
        </div>
      </div>
      <button
        onClick={() => setFollow((prevFollow) => !prevFollow)}>
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
