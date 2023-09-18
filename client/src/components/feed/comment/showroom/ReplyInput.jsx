import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../../common/tokens";

const ReplyInput = ({ comment, feedData, setFeedData }) => {
  const { feedId } = useParams();
  const profileImg = localStorage.getItem("profileImg");
  const comments = comment.comments;
  const commentId = comment.feedReplyId;
  const [inputReply, setInputReply] = useState("");
  const [enterReply, setEnterReply] = useState([]);

  const postReply = async (feedReplyId) => {
    const configParams = {
      method: "POST",
      url: `/feed/${feedId}/feedReply/${feedReplyId}/feedComment`,
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

        // 답글 배열에 새 답글 추가
        const updatedComments = [...comments, newReply];
        setEnterReply(updatedComments);

        // 상위 컴포넌트에서 넘어온 comment를 기반으로 업데이트
        const updatedFeedData = JSON.parse(JSON.stringify(feedData));
        updatedFeedData.replies.forEach((reply) => {
          if (reply.feedReplyId === commentId) {
            reply.comments.push(newReply);
          }
        });
        setFeedData(updatedFeedData);

        // Clear the input field
        setInputReply("");
        toast.success("답글을 입력하셨습니다.");
      }
    } catch (err) {
      toast.error("답글을 추가할 수 없습니다.");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      postReply(comment.feedReplyId);
    }
  };

  if (!comments) {
    return <div>Loading...</div>;
  }

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
          onClick={() => postReply(comment.feedReplyId)}>
          입력
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;