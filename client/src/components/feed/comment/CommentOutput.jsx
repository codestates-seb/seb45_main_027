import React, { useState, useEffect } from "react";
import CommentDelete from "./CommentDelete";
import CommentPatch from "./CommentPatch";
import CommentLike from "./CommentLike";
import ReplyWrap from "./ReplyWrap";

const CommentOutput = ({ feedData, setFeedData }) => {
  const profileImg = localStorage.getItem("profileImg");
  
  // feedData 안에 댓글 접근
  const [replies, setReplies] = useState("");
    
  // 댓글 수정 상태
    const [editComent, setEditComent] = useState({});
    
    // 답글창
    const [showReplyBox, setShowReplyBox] = useState({});


  // 전체데이터에서 댓글 접근
  useEffect(() => {
    if (feedData) {
      setReplies(feedData.replies);
    } 
  }, [feedData]);
    
  return (
    <div>
      {/* 댓글 출력창 */}
      {replies &&
        replies.map((comment, index) => (
          <div key={comment.feedReplyId} className="flex flex-col mt-10">
            <div className="bg-[#fceecd75] p-8 rounded-lg shadow">
              <div className="flex items-start">
                <img
                  src={profileImg}
                  alt="profileImg"
                  className="w-10 h-10 mr-2.5 rounded-full object-cover"
                />
                <div className="flex flex-col ml-4 w-full">
                  <span className="text-lg font-semibold">
                    {comment.nickname}
                  </span>

                  {/* 수정하기 */}
                  <CommentPatch
                    editComent={editComent}
                    setEditComent={setEditComent}
                    comment={comment}
                    setReplies={setReplies}
                  />

                  {/* 작성날짜, 좋아요, 답글 */}
                  <div className="flex items-center text-gray-500 font-medium text-base">
                    {/* 작성날짜 */}
                    <span className="mr-2.5">
                      {/* {comment.createdDateTime.split("T")[0]} */}
                    </span>
                    {/* 좋아요 */}
                    <CommentLike comment={comment} />
                    {/* 답글 */}
                    <div key={comment.feedReplyId} className="flex flex-col">
                      <button
                        className="mx-2"
                        onClick={() =>
                          setShowReplyBox((prev) => ({
                            ...prev,
                            [comment.feedReplyId]: !prev[comment.feedReplyId],
                          }))
                        }>
                        답글 달기
                      </button>
                    </div>
                    {/* 수정 */}
                    <button
                      className="mx-2"
                      onClick={() => {
                        setEditComent({
                          ...editComent,
                          [comment.feedReplyId]: true,
                        });
                      }}>
                      수정하기
                    </button>
                    {/* 삭제 */}
                    <CommentDelete
                      comment={comment}
                      replies={replies}
                      setReplies={setReplies}
                      feedData={feedData}
                      setFeedData={setFeedData}
                    />
                  </div>
                  {showReplyBox[comment.feedReplyId] && (
                    <ReplyWrap
                      commentId={comment.feedReplyId}
                      feedData={feedData}
                      setFeedData={setFeedData}
                      comment={comment}
                      replies={replies}
                      setReplies={setReplies}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentOutput;
