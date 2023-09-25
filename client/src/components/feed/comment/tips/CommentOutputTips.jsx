import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommentDeleteTips from "./CommentDeleteTips";
import CommentPatchTips from "./CommentPatchTips";
import CommentLikeTips from "./CommentLikeTips";
import ReplyInputTips from "./ReplyInputTips";
import ReplyOutputTips from "./ReplyOutputTips";
import CommentPaginationTips from "./CommentPaginationTips";

const CommentOutput = ({ feedData, setFeedData, children }) => {
  const memberId = localStorage.getItem("memberId");
  const navigate = useNavigate();

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

  const [currentPage, setCurrentPage] = useState(1);
  const repliesPerPage = 5;
  const totalPages = replies ? Math.ceil(replies.length / repliesPerPage) : 0;
  const indexOfLastReply = currentPage * repliesPerPage;
  const indexOfFirstReply = indexOfLastReply - repliesPerPage;
  const currentReplies = replies
    ? replies.slice(indexOfFirstReply, indexOfLastReply)
    : [];

  return (
    <div>
      {/* 댓글 출력창 */}
      {replies &&
        currentReplies.map((comment, index) => (
          <div key={comment.tipReplyId} className="flex flex-col mt-10">
            <div className="bg-[#fceecd75] p-8 rounded-lg shadow">
              <div className="flex items-start">
                <img
                  onClick={() => {
                    navigate(`/myinfo/${comment.memberId}`);
                  }}
                  src={
                    comment.memberImage
                      ? comment.memberImage
                      : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
                  }
                  alt="profileImg"
                  className="w-10 h-10 mr-2.5 rounded-full object-cover cursor-pointer"
                />
                <div className="flex flex-col ml-4 w-full">
                  <span
                    onClick={() => {
                      navigate(`/myinfo/${comment.memberId}`);
                    }}
                    className="text-lg font-semibold cursor-pointer"
                  >
                    {comment.nickname}
                  </span>

                  {/* 수정하기 */}
                  <CommentPatchTips
                    editComent={editComent}
                    setEditComent={setEditComent}
                    comment={comment}
                    setReplies={setReplies}
                  />

                  {/* 작성날짜, 좋아요, 답글 */}
                  <div className="flex items-center text-gray-500 font-medium text-base">
                    {/* 작성날짜 */}
                    <span className="mr-2.5 hidden sm:block">
                      {comment.createdDateTime.split("T")[0]}
                    </span>
                    {memberId /* 좋아요 */ && (
                      <CommentLikeTips feedData={feedData} comment={comment} />
                    )}
                    {/* 답글 */}
                    {memberId && (
                      <div key={comment.tipReplyId} className="flex flex-col">
                        <button
                          className="mx-2 hover:font-semibold"
                          onClick={() =>
                            setShowReplyBox((prev) => ({
                              ...prev,
                              [comment.tipReplyId]: !prev[comment.tipReplyId],
                            }))
                          }
                        >
                          답글 달기
                        </button>
                      </div>
                    )}

                    {memberId == comment.memberId && (
                      /* 수정 */
                      <button
                        className="mx-2 hover:font-semibold"
                        onClick={() => {
                          setEditComent({
                            ...editComent,
                            [comment.tipReplyId]: true,
                          });
                        }}
                      >
                        수정하기
                      </button>
                    )}

                    {/* 삭제 */}
                    {memberId == comment.memberId && (
                      <CommentDeleteTips
                        comment={comment}
                        replies={replies}
                        setReplies={setReplies}
                        feedData={feedData}
                        setFeedData={setFeedData}
                      />
                    )}
                  </div>
                  {showReplyBox[comment.tipReplyId] && (
                    <ReplyInputTips
                      comment={comment}
                      feedData={feedData}
                      setFeedData={setFeedData}
                    />
                  )}
                </div>
              </div>
              {/* 답글 출력창 */}
              <ReplyOutputTips
                commentsData={comment.comments}
                feedData={feedData}
                setFeedData={setFeedData}
              />
            </div>
          </div>
        ))}
      {replies && (
        <CommentPaginationTips
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default CommentOutput;
