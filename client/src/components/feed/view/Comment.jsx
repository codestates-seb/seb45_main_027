import React, { useState, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
import api from "../../common/tokens";

//  함수형 컴포넌트는 ref 속성을 가질 수 없지만, forwardRef를 사용하면 이러한 제약을 우회할 수 있다.
const Comment = forwardRef(({ feedData }, ref) => {
  console.log(feedData.replies);
  console.log(feedData);
  // 사이드바에서 댓글 클릭시 이동을 위해 받아 옴.
  // 댓글 좋아요
  const [like, setLike] = useState({});
  // 답글 달기
  const [showReply, setShowReply] = useState({});
  // 댓글/답글 입력값을 저장할 State
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  // 작성된 댓글/답글을 저장할 State
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState({});

  const [feedReplyId, setFeedReplyId] = useState("") // 댓글 번호
  const { feedId } = useParams();  // 게시물 번호

  const getFormattedDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleCommentSubmit = () => {
    const newComment = {
      id: new Date().getTime().toString(),
      text: commentInput,
      date: getFormattedDate(),
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setReplies((prevReplies) => ({ ...prevReplies, [newComment.id]: [] }));
    setCommentInput("");
  };

  // 좋아요 각 상태관리
  const toggleLike = (comment) => {
    setLike((prevLikes) => ({
      ...prevLikes,
      [comment]: !prevLikes[comment],
    }));
  };

  // 답글달기 각 상태관리
  const toggleReply = (commentId) => {
    setShowReply((prevShowReply) => ({
      ...prevShowReply,
      [commentId]: !prevShowReply[commentId],
    }));
  };

  const handleReplySubmit = (commentId) => {
    const newReply = {
      text: replyInput[commentId],
      date: getFormattedDate(),
    };

    setReplies((prevReplies) => {
      const updatedReplies = { ...prevReplies };
      if (updatedReplies[commentId]) {
        updatedReplies[commentId] = [...updatedReplies[commentId], newReply];
      } else {
        updatedReplies[commentId] = [newReply];
      }
      return updatedReplies;
    });

    setReplyInput((prevReplyInput) => ({ ...prevReplyInput, [commentId]: "" }));
  };



  const deleteComments = async (feedReplyId) => {
    const configParams = {
      method: "DELETE",
      url: `/feed/${feedId}/feedReply/${feedReplyId}`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    };
console.log(feedReplyId);
    try {
      const response = await api(configParams);

      if (response.status === 200) {
        setComments(
          comments.filter((comments) => comments.feedReplyId !== feedReplyId)
        );
        toast.success("댓글이 성공적으로 삭제되었습니다.");
      }
    } catch (error) {
      toast.error("댓글 삭제에 실패하였습니다.");
      console.error("댓글 삭제 실패:", error);
      
    }
  };

  return (
    <div className="mt-10" ref={ref}>
      {/* 댓글 수 표시 */}
      <div className="flex">
        <span className="text-xl font-semibold">댓글</span>
        <span className="text-xl font-semibold text-[#35C5F0] ml-2">0</span>
      </div>

      {/* 댓글 입력창 */}
      <div className="flex w-full mt-4">
        <img
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
          alt="유저사진"
        />
        <div className="flex w-full relative">
          <input
            className="h-full w-full ml-4 border rounded-lg pl-4"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            className="absolute right-0 top-1/4 pr-4"
            onClick={handleCommentSubmit}>
            입력
          </button>
        </div>
      </div>

      {/* 댓글 출력창 */}
      {comments.map((comments, index) => (
        <div key={index} className="flex flex-col mt-10">
          <div className="flex items-start">
            <img
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
              alt="유저사진"
            />
            <div className="flex flex-col ml-4 w-full">
              <span className="text-lg font-semibold">댓글 작성자</span>
              <span className="my-4 text-base">{comments.text}</span>
              {/* 작성날짜, 좋아요, 답글 */}
              <div className="flex items-center text-gray-500 font-medium text-base">
                {/* 작성날짜 */}
                <span>{comments.date}</span>

                {/* 좋아요 */}
                <button
                  className="flex items-center mx-4"
                  onClick={() => toggleLike(comments)}>
                  <img
                    className="w-6 h-6 mr-1"
                    src={
                      like[comments]
                        ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-on.png"
                        : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-off.png"
                    }
                    alt="좋아요"
                  />
                  <span>좋아요</span>
                </button>

                {/* 답글 */}
                <button
                  className="mx-1"
                  onClick={() => toggleReply(comments.id)}>
                  답글 달기
                </button>

                {/* 수정 */}
                <button
                  className="mx-2"
                  onClick={() => toggleReply(comments.id)}>
                  수정하기
                </button>

                {/* 삭제 */}
                <button
                  className="mx-2"
                  onClick={() => deleteComments(comments.feedReplyId)}>
                  삭제하기
                </button>
              </div>
            </div>
          </div>
          {/* 답글 입력창 */}
          {showReply[comments.id] && (
            <div className="flex w-full mt-6 ml-10">
              <img
                src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
                alt="유저사진"
              />
              <div className="flex w-full relative">
                <input
                  className="h-full w-full ml-4 border rounded-lg pl-4"
                  value={replyInput[comments.text] || ""}
                  onChange={(e) =>
                    setReplyInput({
                      ...replyInput,
                      [comments.text]: e.target.value,
                    })
                  }
                />
                <button
                  className="absolute right-0 top-1/4 pr-4"
                  onClick={() => handleReplySubmit(comments.id)}>
                  입력
                </button>
              </div>
            </div>
          )}
          {/* 답글 출력창 */}
          {replies[comments.id] &&
            replies[comments.id].map((reply, replyIndex) => (
              <div className="flex items-start mt-10 ml-10 bg-[#fceecd] p-8 rounded-lg shadow">
                <img
                  src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
                  alt="유저사진"
                />
                <div className="flex flex-col ml-4 w-full">
                  {/* 답변 작성자 */}
                  <span className="text-lg font-semibold">답변 작성자</span>

                  {/* 댓글 내용 */}
                  <div key={replyIndex} className="my-4 text-base">
                    {reply.text}
                  </div>

                  {/* 작성날짜 */}
                  <div className="flex items-center text-gray-500 font-medium text-base">
                    {/* 작성날짜 */}
                    <span>{reply.date}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
});

export default Comment;