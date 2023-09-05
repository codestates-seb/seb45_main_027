import React, { useState } from "react";

const button = "flex items-center justify-center rounded-lg shadow w-32 h-full";

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
      <button className="" onClick={() => setFollow(!follow)}>
        {follow ? (
          <div className={`bg-white ${button} `}>
            <img src="/images/check.png" alt="" />
            <span className=" text-gray-800 font-semibold pl-1">팔로잉</span>
          </div>
        ) : (
          <div className={`bg-[#00647B] ${button} `}>
            <img src="/images/plus.png" alt="" />
            <span className="text-white font-semibold pl-1">팔로우</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default TipsUserTop;
