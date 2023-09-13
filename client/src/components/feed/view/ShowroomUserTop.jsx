import React, { useEffect} from "react";
import { toast } from "react-hot-toast";
import { useUserContext } from "../../../context/userContext";

const button =
  "flex items-center justify-center rounded-lg shadow h-full px-5 py-4";
const div = "flex flex-col items-center px-6";
const img = "w-10 h-10 mb-2";

const ShowroomUserTop = ({ nickname, memberImage, createdDate, roomTypeName,roomInfoName,roomSizeName, roomCountName, locationName, loading, error  }) => {
  const { follow, setFollow } = useUserContext();

  useEffect(() => {
    if (!nickname && !createdDate) {
      toast.loading("로딩중...");
    } else if (nickname && createdDate) {
      toast.dismiss();
    }
  }, [nickname, createdDate]);
  return (
    <div className="flex-col items-center lg:flex-row flex justify-between p-2 lg:p-8 mt-10 pt-10 rounded-lg shadow bg-white">
      <div className="flex items-center px-5">
        <div className="border w-12 h-12 rounded-full mr-4">
          <img src={`${memberImage}`}  alt="" />
        </div>
        <div>
          <div className="text-lg font-semibold">{nickname}</div>
          <div className="text-gray-500">{createdDate}</div>
        </div>
      </div>
      <div className="flex pt-10 lg:pt-0">
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/city.png"
            alt="주거형태"
          />
          <span>{roomTypeName}</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/width.png "
            alt="공간"
          />
          <span>{roomInfoName}</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/door.png"
            alt="평수"
          />
          <span>{roomSizeName}</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/house.png "
            alt="방개수"
          />
          <span>{roomCountName}</span>
        </div>
        <div className={div}>
          <img
            className={img}
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/local.png"
            alt="지역"
          />
          <span>{locationName}</span>
        </div>
      </div>
      <button className="h-full p-10" onClick={() => setFollow(!follow)}>
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
