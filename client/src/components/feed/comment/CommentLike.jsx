import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../common/tokens";

const CommentLike = ({ comment }) => {
  const { feedId } = useParams(); // 게시물 번호
  const [like, setLike] = useState(false);

  const likeComment = async (feedReplyId) => {
    const newLikeStatus = !like;
    const configParams = {
      method: "PATCH",
      url: `/feed/${feedId}/feedReply/${feedReplyId}`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      data: {
        replyLikeYn: newLikeStatus,
      },
    };
    
    try {
        const response = await api(configParams);
        
      if (response && response.status === 200) {
        setLike(newLikeStatus);
        toast.success("해당 댓글을 좋아합니다.");
      } else {
        toast.error("다시 시도해주세요");
      }
        console.log(response);
    } catch (err) {
      toast.error("다시 시도해주세요");
    }
    
  };

  return (
    <>
      <button
        className="flex items-center"
        onClick={() => likeComment(comment.feedReplyId)}>
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
