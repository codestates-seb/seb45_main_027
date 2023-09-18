import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReplyDelete from "./ReplyDelete";
import ReplyPatch from "./ReplyPatch";

const ReplyOutput = ({ commentsData, feedData, setFeedData }) => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");

  const [editReply, setEditReply] = useState({});

  console.log(commentsData);
  if (!commentsData) {
    return;
  }

  return (
    <>
      {commentsData.map((comment, idx) => (
        <div
          key={idx}
          className="flex items-start mt-10 ml-10 bg-[#fceecd75] p-8 rounded-lg shadow">
          <img
            src={
              comment.memberImage
                ? comment.memberImage
                : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userImg.png"
            }
            onClick={() => {
              navigate(`/myinfo/${comment.memberId}`);
            }}
            className="w-10 h-10 mr-2.5 rounded-full object-cover cursor-pointer"
            alt="유저사진"
          />

          <div className="flex flex-col ml-4 w-full">
            {/* 답변 작성자 */}
            <span
              onClick={() => {
                navigate(`/myinfo/${comment.memberId}`);
              }}
              className="text-lg font-semibold cursor-pointer">
              {comment.nickname}
            </span>

            {/* 수정하기 */}
            <ReplyPatch
              comment={comment}
              commentsData={commentsData}
              setFeedData={setFeedData}
              feedData={feedData}
              editReply={editReply}
              setEditReply={setEditReply}
            />
            {/* 댓글 내용 */}
            <div className="flex items-center text-gray-500 font-medium text-base">
              {/* 작성날짜 */}
              <div className="flex items-center text-gray-500 font-medium text-base">
                {/* 작성날짜 */}
                <span className="mr-1">
                  {comment.createdDateTime.split("T")[0]}
                </span>
              </div>

              {/* 수정 */}
              {memberId == comment.memberId && (
                <button
                  className="mx-2 hover:font-semibold"
                  onClick={() => {
                    setEditReply({
                      ...editReply,
                      [comment.feedCommentId]: true,
                    });
                  }}>
                  수정하기
                </button>
              )}
              {/* 삭제 */}
              {memberId == comment.memberId && (
                <ReplyDelete
                  comment={comment}
                  commentsData={commentsData}
                  setFeedData={setFeedData}
                  feedData={feedData}
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReplyOutput;
