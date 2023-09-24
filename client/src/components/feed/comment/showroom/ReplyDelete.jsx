import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../../common/tokens";

const ReplyDelete = ({ comment, commentsData, setFeedData, feedData }) => {
  const { feedId } = useParams(); // 게시물 번호
  const commentId = comment.feedCommentId;
  const feedReplyId = comment.feedReplyId;

  // DELETE 요청
  const deleteReply = async () => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (shouldDelete) {
      const configParams = {
        method: "DELETE",
        url: `/feed/${feedId}/feedReply/${feedReplyId}/feedComment/${commentId}`,

        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      };

      try {
        const res = await api(configParams);
        if (res && res.status === 200) {
          // feedData를 복사해서 업데이트
          const updatedFeedData = JSON.parse(JSON.stringify(feedData));

          updatedFeedData.replies.forEach((reply) => {
            if (reply.feedReplyId === feedReplyId) {
              reply.comments = reply.comments.filter(
                (comment) => comment.feedCommentId !== commentId
              ); // 답글을 삭제
            }
          });
          setFeedData(updatedFeedData); // 상태를 업데이트
          toast.success("답글을 삭제했습니다.");
        }
      } catch (err) {
        console.error("err comment:", err);
        toast.error("답글을 삭제할 수 없습니다.");
      }
    }
  };

  return (
    <div>
      <button
        className="mx-1 hover:font-semibold"
        onClick={() => {
          deleteReply();
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default ReplyDelete;
