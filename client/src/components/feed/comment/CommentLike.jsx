import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

const CommentLike = ({  comment }) => {
  const feedReplyId = comment.feedReplyId;  
  const [like, setLike] = useState("");

  // 좋아요 상태
  const [resLike, errLike, loadingLike, fetchLikeData] = useAxios(
    {
      method: "PATCH",
      url: `/feed/feedReply/${feedReplyId}/feedReplyLike`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    },
    false
  );

  const toggleLike = () => {
    fetchLikeData();
    setLike(!like);
    toast.success("클릭하셨습니다.")
  };

  // [좋아요/북마크] 받아온 요청 상태 저장
  useEffect(() => {
    if (comment) {
      setLike(comment.replyLikeYn);
    }
  }, [comment]);

  console.log(comment.replyLikeYn);
  return (
    <>
      <button
        className="flex items-center hover:font-semibold"
        onClick={toggleLike}>
        <img
          className="w-6 h-6 mr-1"
          src={
            like
              ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-on.png"
              : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-off.png"
          }
          alt="좋아요"
        />
        <span className="mr-1">좋아요</span>
      </button>
    </>
  );
};

export default CommentLike;
