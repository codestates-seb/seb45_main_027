import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../../common/tokens";

const CommentInput = ({ feedData, setFeedData }) => {
  const memberId = localStorage.getItem("memberId");
  const profileImg = localStorage.getItem("profileImg");
  const { feedId } = useParams(); // 게시물 번호
  // 입력할 댓글
  const [inputComment, setInputComment] = useState("");
  // 입력한 댓글
  const [enterComment, setEnterComment] = useState([]);
  const defalutImage =
    "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png";

  const navigate = useNavigate();

  //POST 요청
  const postComment = async () => {
    const configParams = {
      method: "POST",
      url: `/feed/${feedId}/feedReply`,
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

        setInputComment("");
        toast.success("댓글이 정상적으로 등록되었습니다.");
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
        {feedData && feedData.replies && (
          <span className="text-xl font-semibold text-[#35C5F0] ml-2">
            {feedData.replies.length}
          </span>
        )}
      </div>
      <div className="flex w-full mt-4">
        <img
          src={profileImg ? profileImg : defalutImage}
          alt="profileImg"
          className="w-10 h-10 mr-2.5 rounded-full object-cover"
        />
        {memberId ? (
          <div className="flex w-full relative">
            <input
              className="h-full w-full ml-4 border rounded-lg pl-4"
              value={inputComment}
              onKeyDown={handleEnter}
              onChange={(e) => setInputComment(e.target.value)}
            />
            <button
              className="absolute right-0 top-1/4 pr-4"
              onClick={postComment}
            >
              입력
            </button>
          </div>
        ) : (
          <div
            className="flex w-full relative"
            onClick={() => navigate("/login")}
          >
            <input
              className="h-full w-full ml-4 border rounded-lg pl-4"
              disabled={true}
              placeholder="로그인이 필요한 서비스 입니다."
              onClick={() => navigate("/login")}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default CommentInput;
