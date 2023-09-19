import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const buttonStyle =
  "flex items-center justify-center rounded-lg shadow w-32 h-full";

const TipsUserTop = ({ feedData, setFollow, follow, res }) => {
  const memberId = localStorage.getItem("memberId");
  const frommemberId = feedData.memberId;
  const navigate = useNavigate();

  const [patchRes, patchErr, patchLoading, patchFetchData] = useAxios(
    {
      method: "PATCH",
      url: `/follow/choose/${memberId}/${frommemberId}`,
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

  const toggleFollow = () => {
    patchFetchData();
    setFollow(!follow);
  };

  // 팔로우 받아온 요청 상태 저장
  useEffect(() => {
    if (feedData) {
      setFollow(feedData.followYn);
    }
  }, [feedData]);

  console.log(feedData.followYn);

  return (
    <div className="flex justify-between pt-20">
      <div className="flex items-center">
        <div className="border w-12 h-12 rounded-full mr-4">
          <img
            onClick={() => {
              navigate(`/myinfo/${feedData.memberId}`);
            }}
            src={
              feedData.memberImage
                ? feedData.memberImage
                : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
            }
            alt="profileImg"
            className="w-10 h-10 mr-2.5 rounded-full object-cover"
          />
        </div>
        <div>
          <div
            onClick={() => {
              navigate(`/myinfo/${feedData.memberId}`);
            }}
            className="text-lg font-semibold">
            {feedData.nickname}
          </div>
          <div className="text-gray-500">{datePart}</div>
        </div>
      </div>
      {memberId != frommemberId && (
        <button onClick={toggleFollow}>
          {follow
            ? (
            <div className={`bg-white ${buttonStyle} `}>
              <img
                src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/check.png"
                alt="팔로잉"
              />
              <span className="text-gray-800 font-semibold pl-1">팔로잉</span>
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
      )}
    </div>
  );
};

export default TipsUserTop;
