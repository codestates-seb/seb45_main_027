import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../../common/tokens";

const ReplyInput = ({ comment, feedData, setFeedData }) => {
  const { tipId } = useParams();
  const profileImg = localStorage.getItem("profileImg");
  const comments = comment.comments;
  const commentId = comment.tipReplyId;
  const [inputReply, setInputReply] = useState("");
  const [enterReply, setEnterReply] = useState([]);

  const postReply = async (tipReplyId) => {
    const configParams = {
      method: "POST",
      url: `/tip/${tipId}/tipReply/${tipReplyId}/tipComment`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      data: {
        content: inputReply,
      },
    };
    try {
      const res = await api(configParams);
      if (res && res.status === 200) {
        const newReply = res.data;

        // 기존 feedData를 얕은 복사하여 업데이트 진행
        const updatedFeedData = { ...feedData };
        updatedFeedData.replies = updatedFeedData.replies.map((reply) => {
          if (reply.tipReplyId === commentId) {
            // 해당 답글의 comments 배열에 새로운 답글 추가
            // 예외를 방지하기 위해 reply.comments가 undefined일 경우 기본적으로 빈 배열로 설정해야함!!
            const updatedComments = Array.isArray(reply.comments)
              ? [...reply.comments]
              : [];
            return {
              ...reply,
              comments: [...updatedComments, newReply],
            };
          }
          return reply;
        });

        // 업데이트된 feedData를 설정
        setFeedData(updatedFeedData);

        setInputReply("");
        toast.success("답글을 입력하셨습니다.");
      } else {
        console.error("POST 요청 실패: " + res.status);
        toast.error("답글을 추가할 수 없습니다.");
      }
    } catch (err) {
      console.error("예외 발생: " + err);
      toast.error("답글을 추가하는 중 오류가 발생했습니다.");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      postReply(comment.tipReplyId);
    }
  };

  useEffect(() => {
    // 답글 입력 후 상태 업데이트
    if (comments !== undefined) {
      setEnterReply(comments);
    }
  }, [comments]);

  return (
    <div className="w-full flex mt-6">
      <img
        src={profileImg}
        className="w-10 h-10 mr-2.5 rounded-full object-cover"
        alt="유저사진"
      />
      <div className="flex w-full relative">
        <input
          className="h-full w-full ml-4 border rounded-lg pl-4"
          value={inputReply}
          onKeyDown={handleEnter}
          onChange={(e) => setInputReply(e.target.value)}
        />
        <button
          className="absolute right-0 top-1/4 pr-4"
          onClick={() => postReply(comment.tipReplyId)}>
          입력
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;
