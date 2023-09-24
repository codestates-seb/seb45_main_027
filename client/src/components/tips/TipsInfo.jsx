import React from "react";
import { useNavigate } from "react-router-dom";

const TipsInfo = ({ handleTipClick, item }) => {
  const navigate = useNavigate();

  return (
    <div className="h-[100px] flex flex-col justify-between px-4 mb-4">
      <div
        className="flex justify-center"
        onClick={() => handleTipClick(item.tipId)}>
        <span className="text-2xl font-bold mt-8">{item.title}</span>
      </div>

      <div className="flex justify-between text-xl">
        <div className="flex">
          <div className="flex items-center mr-4">
            <img
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/Tips_like.png"
              alt="Tips_like"
              className="w-5 h-5 rounded-full"
            />
            <span className="ml-1 text-lg font-medium text-gray-800">
              {item.likeCount}
            </span>
          </div>
          <div className="flex items-center mr-4">
            <img
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/Tips_comment.png"
              alt="Tips_comment"
              className="w-5 h-5 rounded-full"
            />
            <span className="ml-1 text-lg font-medium text-gray-800">
              {item.replies ? item.replies.length : 0}
            </span>
          </div>
          <div className="flex items-center mr-4">
            <img
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/Tips_view.png"
              alt="Tips_view"
              className="w-5 h-5 rounded-full"
            />
            <span className="ml-1 text-lg font-medium text-gray-800">
              {item.views}
            </span>
          </div>
        </div>
        <span
          onClick={() => {
            navigate(`/myinfo/${item.memberId}`);
          }}
          className="flex items-center text-lg font-semibold text-gray-600 cursor-pointer">
          {item.nickname}
        </span>
      </div>
    </div>
  );
};

export default TipsInfo;
