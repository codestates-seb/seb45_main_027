import React, { useState, useEffect } from "react";

const ViewPoint = ({ feedData }) => {
  const [likeCount, setLikeCount] = useState(feedData.likeCount || "0");
  const [bookMarkCount, setBookMarkCount] = useState(
    feedData.bookMarkCount || feedData.bookmarkCount || "0"
  );
  const [repliesCount, setRepliesCount] = useState(
    feedData.repliesCount || "0"
  );
  const [views, setViews] = useState(feedData.views || "0");

  useEffect(() => {
    // feedData prop이 변경될 때 상태를 업데이트
    setLikeCount(feedData.likeCount);
    setBookMarkCount(
      feedData.bookMarkCount || feedData.bookmarkCount || feedData.bookmarkCount
    );
    setRepliesCount(feedData.repliesCount);
    setViews(feedData.views);
  }, [feedData]);

  if (!feedData) {
    return null;
  }

  return (
    <div className="flex mt-20 pb-10 border-b">
      <div className="flex mr-4 text-lg text-gray-600">
        <span>좋아요</span>
        <span className="font-semibold ml-1">{likeCount}</span>
      </div>
      <div className="flex mr-4 text-lg text-gray-600">
        <span>스크랩</span>
        <span className=" font-semibold ml-1">{bookMarkCount}</span>
      </div>
      <div className="flex mr-4 text-lg text-gray-600">
        <span>댓글</span>
        <span className=" font-semibold ml-1">{repliesCount}</span>
      </div>
      <div className="flex mr-4 text-lg text-gray-600">
        <span>조회</span>
        <span className=" font-semibold ml-1">{views}</span>
      </div>
    </div>
  );
};

export default ViewPoint;
