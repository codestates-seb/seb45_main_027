import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
import { useUserContext } from "../../../context/userContext";

const buttonStyle =
  "flex items-center justify-center rounded-lg shadow w-32 h-full";

const TipsUserTop = () => {
  const { follow, setFollow, nickname, setNickname } = useUserContext();
  const { tipId } = useParams();
  const [createdDate, setCreatedDate] = useState(null);

  const configParams = {
    method: "GET",
    url: `/tip/${tipId}`,
    headers: {
      "ngrok-skip-browser-warning": "69420",
    },
  };

  const [response, error, loading] = useAxios(configParams);

  useEffect(() => {
    if (response) {
      setNickname(response.data.nickname);
      const dateTime = response.data.createdDateTime.split("T")[0]; // T 뒤에 시간 부분은 받아오지 않기 위해서 추가
      setCreatedDate(dateTime);
    } else if (error) {
      console.error("Error:", error);
    }
  }, [response, error]);

  useEffect(() => {
    if (!nickname && !createdDate && loading) {
      toast.loading("로딩중...");
    } else if ((nickname && createdDate) || error) {
      toast.dismiss();
    }
  }, [nickname, createdDate, loading, error]);

  return (
    <div className="flex justify-between pt-20">
      <div className="flex items-center">
        <div className="border w-12 h-12 rounded-full bg-red-500 mr-4"></div>
        <div>
          <div className="text-lg font-semibold">{nickname}</div>
          <div className="text-gray-500">{createdDate}</div>
        </div>
      </div>
      <button onClick={() => setFollow((prevFollow) => !prevFollow)}>
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
