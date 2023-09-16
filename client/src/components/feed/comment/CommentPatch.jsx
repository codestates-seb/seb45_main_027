import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../common/tokens";

const CommentPatch = ({ comment, setReplies,editComent, setEditComent }) => {
  const { feedId } = useParams(); // 게시물 번호
  const [newContent, setNewContent] = useState("");

  //PATCH 요청
  const patchComment = async (feedReplyId) => {
    const configParams = {
      method: "PATCH",
      url: `/feed/${feedId}/feedReply/${feedReplyId}`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      data: {
        content: newContent,
      },
    };
    try {
      const response = await api(configParams)

      if (response && response.status === 200) {
        setReplies((prevComments) =>
          prevComments.map((comment) => {
            if (comment.feedReplyId === feedReplyId) {
              return { ...comment, content: newContent };
            }
            return comment;
          })
        );
        setEditComent({ ...editComent, [feedReplyId]: false })
        toast.success("댓글이 수정되었습니다.")
      } else {
        toast.error("댓글을 수정하지 못했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      toast.error("댓글을 수정하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <span className="my-4 text-base">
      {editComent[comment.feedReplyId] ? (
        <div className="w-full flex">
          <input
            className="w-full border rounded-md mr-1 text-lg px-2.5"
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <button
            className="min-w-max border rounded-md bg-white mr-1 px-2"
            onClick={() => {
               patchComment(comment.feedReplyId);
            }}>
            완료
          </button>
          <button
            className="min-w-max border rounded-md bg-white px-2"
            onClick={() => {
              setNewContent(comment.content);
              setEditComent({...editComent,[comment.feedReplyId]: false,});
            }}>
            취소
          </button>
        </div>
      ) : (
        comment.content
      )}
    </span>
  );
};

export default CommentPatch;
