import React from "react";
import ReplyLike from "./ReplyLike";
import ReplyDelete from "./ReplyDelete";

const ReplyOutput = ({ replies, setReplies, comment, commentId, feedData, setFeedData }) => {
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
                <div className="flex items-center text-gray-500 font-medium text-base">
                  {/* 작성날짜 */}
                  <div className="flex items-center text-gray-500 font-medium text-base">
                    {/* 작성날짜 */}
                    <span className="mr-1">
                      {comments.createdDateTime.split("T")[0]}
                    </span>
                  </div>
                  {/* 좋아요 */}
                  <ReplyLike
                    comments={comments}
                    feedData={feedData}
                    comment={comment}
                    replies={replies}
                  />
                  {/* 수정 */}
                  <button className="mx-1">수정하기</button>
                  {/* 삭제 */}
                  <ReplyDelete
                    comments={comments}
                    comment={comment}
                    replies={replies}
                    setReplies={setReplies}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    );
};

export default ReplyOutput;