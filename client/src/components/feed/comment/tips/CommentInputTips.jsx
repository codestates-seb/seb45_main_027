import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../../common/tokens";

const CommentInput = ({ feedData, setFeedData }) => {
  const profileImg = localStorage.getItem("profileImg");
  const { tipId } = useParams(); // 게시물 번호
  // 입력할 댓글
  const [inputComment, setInputComment] = useState("");
  // 입력한 댓글
  const [enterComment, setEnterComment] = useState([]);

  //POST 요청
  const postComment = async () => {
    const configParams = {
      method: "POST",
      url: `/tip/${tipId}/tipreply`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      data: {
        content: inputComment,
      },
    };
    try {
      const res = await api(configParams);
      if (res && res.status === 200) {
        const newComment = res.data;
        setEnterComment((prevComments) => [...prevComments, newComment]);

        const addCommentCout = feedData.repliesCount + 1; // 기존 댓글 수 +1
        const addComment = [...feedData.replies, newComment];
        // feedData 업데이트
        setFeedData({
          ...feedData,
          repliesCount: addCommentCout,
          replies: addComment,
        });
        console.log(res.data);

        setInputComment("");
        toast.success("댓글을 입력하셨습니다.");
      } else {
        console.error("status code:", res?.status, res?.data);
        toast.error("댓글을 추가할 수 없습니다.");
      }
    } catch (err) {
      console.error("err comment:", err);
      toast.error("댓글을 추가할 수 없습니다.");
    }
  };

  // 엔터 누르면 자동으로 입력
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      postComment();
    }
  };

  return (
    <>
      {/* 댓글 수 표시 */}
      <div className="flex">
        <span className="text-xl font-semibold">댓글</span>
        <span className="text-xl font-semibold text-[#35C5F0] ml-2">
          {feedData.repliesCount}
        </span>
      </div>
      <div className="flex w-full mt-4">
        <img
          src={profileImg}
          alt="profileImg"
          className="w-10 h-10 mr-2.5 rounded-full object-cover"
        />
        <div className="flex w-full relative">
          <input
            className="h-full w-full ml-4 border rounded-lg pl-4"
            value={inputComment}
            onKeyDown={handleEnter}
            onChange={(e) => setInputComment(e.target.value)}
          />
          <button
            className="absolute right-0 top-1/4 pr-4"
            onClick={postComment}>
            입력
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentInput;
