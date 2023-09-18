import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../../common/tokens";

const ReplyPatch = ({
  comment,
  commentsData,
  setFeedData,
  feedData,
  editReply,
  setEditReply,
}) => {
  const { feedId } = useParams(); // 게시물 번호
  const commentId = comment.feedCommentId;
  const feedCommentId = comment.feedCommentId;
  const [newContent, setNewContent] = useState(comment.content); // 수정하기를 누를때 기존 값 유지하기 위해서!
  const [afterContent, setAfterContent] = useState(""); // 수정후 결과값

  // PATCH 요청
  const patchReply = async () => {
    const configParams = {
      method: "PATCH",
      url: `/feed/${feedId}/feedReply/${feedCommentId}/feedComment/${commentId}`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      data: {
        content: newContent,
      },
    };

    try {
      const response = await api(configParams);

      if (response && response.status === 200) {
        // feedData를 얕은복사
        const updatedFeedData = { ...feedData };

        updatedFeedData.replies.forEach((reply) => {
          if (reply.feedCommentId === feedCommentId) {
            reply.comments = reply.comments.map((comment) => {
              if (comment.feedCommentId === commentId) {
                // 새로운 객체 생성하여 내용 수정
                return { ...comment, content: newContent };
              }
              return comment;
            });
          }
        });
        setFeedData(updatedFeedData);
        setAfterContent(newContent);
        toast.success("답글이 수정되었습니다.");
      } else {
        toast.error("답글을 수정하지 못했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      toast.error("답글을 수정하는 중 오류가 발생했습니다.");
    }
  };

  // 엔터 누르면 자동으로 입력, esc 누를시 댓글 수정창 닫기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      patchReply();
      setEditReply({
        ...editReply,
        [comment.feedCommentId]: false,
      });
    }

    if (e.key === "Escape") {
      setNewContent(comment.content);
      setEditReply({
        ...editReply,
        [comment.feedCommentId]: false,
      });
    }
  };

  return (
    <span className="my-4 text-base">
      {editReply[comment.feedCommentId] ? (
        <>
          <div className="w-full flex">
            <input
              className="w-full border rounded-md mr-1 text-lg px-2.5"
              type="text"
              value={newContent}
              onKeyDown={handleKeyDown}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <button
              className="min-w-max border rounded-md bg-white mr-1 px-2"
              onClick={() => {
                patchReply();
                setEditReply({ ...editReply, [comment.feedCommentId]: false });
              }}
            >
              완료
            </button>
            <button
              className="min-w-max border rounded-md bg-white px-2"
              onClick={() => {
                setNewContent(comment.content);
                setEditReply({ ...editReply, [comment.feedCommentId]: false });
              }}
            >
              취소
            </button>
          </div>
        </>
      ) : afterContent ? (
        afterContent
      ) : (
        comment.content
      )}
    </span>
  );
};

export default ReplyPatch;
