import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const ViewPoint = ({ goodCount,bookMarkCount, commentCount, viewCount, loading, error }) => {
  useEffect(() => {
    if ((!goodCount || !commentCount || !viewCount) && loading) {
      toast.loading("로딩중...");
    } else if (goodCount || error) {
      toast.dismiss();
    }
  }, [goodCount, commentCount, viewCount, loading, error]);

  return (
    <div className="flex mt-20 pb-10 border-b">
      <div className="flex mr-4 text-lg text-gray-600">
        <span>좋아요</span>
        <span className="font-semibold ml-1">{ goodCount || "00" }</span>
      </div>
      <div className="flex mr-4 text-lg text-gray-600">
        <span>스크랩</span>
        <span className=" font-semibold ml-1">{ bookMarkCount || "00" }</span>
      </div>
      <div className="flex mr-4 text-lg text-gray-600">
        <span>댓글</span>
        <span className=" font-semibold ml-1">{ commentCount || "00" }</span>
      </div>
      <div className="flex mr-4 text-lg text-gray-600">
        <span>조회</span>
        <span className=" font-semibold ml-1">{ viewCount || "00" }</span>
      </div>
    </div>
  );
};

export default ViewPoint;
