import React, { useState } from "react";

const button = "flex items-center justify-center rounded-lg shadow h-full px-10 py-4";
const div = "flex flex-col items-center px-6";
const img = "w-10 h-10 mb-2";


const ShowroomUserTop = () => {
  const [follow, setFollow] = useState(false);

  return (
    <div className="flex-col items-center lg:flex-row flex justify-between p-2 lg:p-8 mt-10 pt-10 rounded-lg shadow bg-white">
      <div className="flex items-center px-10">
        <div className="border w-12 h-12 rounded-full bg-red-500 mr-4" />
        <div>
          <div className="text-lg font-semibold">유저이름</div>
          <div className="text-gray-500">게시 날짜</div>
        </div>
      </div>
      <div className="flex pt-10 lg:pt-0">
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/city.png"
            alt="주거형태"
          />
          <span>주거형태</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/width.png "
            alt="공간"
          />
          <span>공간</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/door.png"
            alt="평수"
          />
          <span>평수</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/house.png "
            alt="방개수"
          />
          <span>방개수</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/local.png"
            alt="지역"
          />
          <span>지역</span>
        </div>
      </div>
      <button className="h-full p-10" onClick={() => setFollow(!follow)}>
        {follow ? (
          <div className={`bg-gray-100 hover:bg-gray-200 ${button} `}>
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
