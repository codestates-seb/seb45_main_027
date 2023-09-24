import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../../common/tokens";

const CommentDelete = ({
  comment,
  replies,
  setReplies,
  setFeedData,
  feedData,
}) => {
  const { feedId } = useParams(); // 게시물 번호

  // DELETE 요청
  const deleteComment = (feedReplyId) => {
    const shouldDelete = window.confirm("정말로 삭제하시겠습니까?");

    if (shouldDelete) {
      const configParams = {
        method: "DELETE",
        url: `/feed/${feedId}/feedReply/${feedReplyId}`,
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      };

      try {
        api(configParams)
          .then((res) => {
            if (res && res.status === 200) {
              setReplies((prevReplies) =>
                prevReplies.filter((reply) => reply.feedReplyId !== feedReplyId)
              );

              setFeedData((prevFeedData) => ({
                ...prevFeedData,
                replies: prevFeedData.replies.filter(
                  (reply) => reply.feedReplyId !== feedReplyId
                ),
              }));

              toast.success("댓글을 삭제하였습니다.");
            } else {
              toast.error("댓글을 삭제할 수 없습니다.");
            }
          })
          .catch((err) => {
            console.error("err comment:", err);
            toast.error("댓글을 삭제할 수 없습니다.");
          });
      } catch (error) {
        console.error("err comment:", error);
        toast.error("댓글을 삭제할 수 없습니다.");
      }
    }
  };

  return (
    <div>
      <button
        className="mx-2 hover:font-semibold"
        onClick={() => {
          deleteComment(comment.feedReplyId);
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default CommentDelete;
