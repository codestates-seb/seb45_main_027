import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../../common/tokens";

const ReplyDelete = ({ comment, commentsData, setFeedData, feedData }) => {
  const { tipId } = useParams(); // 게시물 번호
  const commentId = comment.tipCommentId;
  const tipReplyId = comment.tipReplyId;

  // DELETE 요청
  const deleteReply = async () => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (shouldDelete) {
      const configParams = {
        method: "DELETE",
        url: `/tip/${tipId}/tipReply/${tipReplyId}/tipComment/${commentId}`,

        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      };

      try {
        const res = await api(configParams);
        if (res && res.status === 200) {
          // tipData를 복사해서 업데이트
          const updatedtipData = JSON.parse(JSON.stringify(feedData));

          updatedtipData.replies.forEach((reply) => {
            if (reply.tipReplyId === tipReplyId) {
              reply.comments = reply.comments.filter(
                (comment) => comment.tipCommentId !== commentId
              ); // 답글을 삭제
            }
          });
          setFeedData(updatedtipData); // 상태를 업데이트
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
