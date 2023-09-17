import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../common/tokens";

const ReplyOutput = ({ replies, setReplies, comment, commentId, feedData, setFeedData }) => {
    const { feedId } = useParams(); // 게시물 번호
    const comments = comment.comments; // 댓글 안 답글

    return (
      <div>
        {comments &&
          comments.map((comments, idx) => (
            <div
              key={commentId}
              className="flex items-start mt-10 ml-10 bg-[#fceecd75] p-8 rounded-lg shadow">
              <img
                src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
                alt="유저사진"
              />
              <div className="flex flex-col ml-4 w-full">
                {/* 답변 작성자 */}
                <span className="text-lg font-semibold">
                  {comments.nickname}
                </span>

                {/* 댓글 내용 */}
                <div className="my-4 text-base">{comments.content}</div>

                {/* 작성날짜 */}
                <div className="flex items-center text-gray-500 font-medium text-base">
                  {/* 작성날짜 */}
                  <span>{comments.createdDateTime.split("T")[0]}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
};

export default ReplyOutput;