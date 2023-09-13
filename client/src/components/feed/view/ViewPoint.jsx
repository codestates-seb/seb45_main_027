import React from "react";

const ViewPoint = ({ feedData }) => {

  return (
    <div className="flex mt-20 pb-10 border-b">
      <div className="flex mr-4 text-lg text-gray-600">
        <span>좋아요</span>
        <span className="font-semibold ml-1">{feedData.likeCount || "00"}</span>
      </div>
      <div className="flex mr-4 text-lg text-gray-600">
        <span>스크랩</span>
        <span className=" font-semibold ml-1">
          {feedData.bookMarkCount || "00"}
        </span>
      </div>
      <div className="flex mr-4 text-lg text-gray-600">
        <span>댓글</span>
        <span className=" font-semibold ml-1">
          {feedData.repliesCount || "00"}
        </span>
      </div>
      <div className="flex mr-4 text-lg text-gray-600">
        <span>조회</span>
        <span className=" font-semibold ml-1">{feedData.views || "00"}</span>
      </div>
    </div>
  );
};

export default ViewPoint;
