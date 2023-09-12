import React, { useState, forwardRef  } from "react";

//  함수형 컴포넌트는 ref 속성을 가질 수 없지만, forwardRef를 사용하면 이러한 제약을 우회할 수 있다.
const Comment = forwardRef((props, ref) => { // 사이드바에서 댓글 클릭시 이동을 위해 받아 옴.
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

  const getFormattedDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleCommentSubmit = () => {
    const newComment = {
      text: commentInput,
      date: getFormattedDate(),
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setReplies((prevReplies) => ({ ...prevReplies, [commentInput]: [] }));
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
  const toggleReply = (comment) => {
    setShowReply((prevShowReply) => ({
      ...prevShowReply,
      [comment]: !prevShowReply[comment],
    }));
  };

  
  const handleReplySubmit = (comment) => {
    const newReply = {
      text: replyInput,
      date: getFormattedDate(),
    };
    setReplies((prevReplies) => ({
      ...prevReplies,
      [comment]: [[...prevReplies[comment]], newReply],
    }));
    setReplyInput("");
    toggleReply(comment);
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
      {comments.map((comment, index) => (
        <div key={index} className="flex flex-col mt-10">
          <div className="flex items-start">
            <img
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
              alt="유저사진"
            />
            <div className="flex flex-col ml-4 w-full">
              <span className="text-lg font-semibold">댓글 작성자</span>
              <span className="my-4 text-base">{comment.text}</span>
              {/* 작성날짜, 좋아요, 답글 */}
              <div className="flex items-center text-gray-500 font-medium text-base">
                {/* 작성날짜 */}
                <span>{comment.date}</span>

                {/* 좋아요 */}
                <button
                  className="flex items-center mx-4"
                  onClick={() => toggleLike(comment)}>
                  <img
                    className="w-6 h-6 mr-1"
                    src={
                      like[comment]
                        ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-on.png"
                        : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-off.png"
                    }
                    alt="좋아요"
                  />
                  <span>좋아요</span>
                </button>

                {/* 답글 */}
                <button onClick={() => toggleReply(comment)}>답글 달기</button>
              </div>
            </div>
          </div>
          {/* 답글 입력창 */}
          {showReply[comment] && (
            <div className="flex w-full mt-6 ml-10">
              <img
                src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
                alt="유저사진"
              />
              <div className="flex w-full relative">
                <input
                  className="h-full w-full ml-4 border rounded-lg pl-4"
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                />
                <button
                  className="absolute right-0 top-1/4 pr-4"
                  onClick={() => handleReplySubmit(comment)}>
                  입력
                </button>
              </div>
            </div>
          )}
          {/* 답글 출력창 */}
          {replies[comment] &&
            replies[comment].map((reply, replyIndex) => (
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
                    {reply.text} {/* 답글 내용 출력 부분을 reply.text로 변경 */}
                  </div>

                  {/* 작성날짜 */}
                  <div className="flex items-center text-gray-500 font-medium text-base">
                    {/* 작성날짜 */}
                    <span>
                      {reply.date}
                    </span>
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