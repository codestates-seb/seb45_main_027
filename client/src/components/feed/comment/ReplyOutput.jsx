import React from "react";
import { useNavigate } from "react-router-dom";
import ReplyDelete from "./ReplyDelete";
import ReplyPatch from "./ReplyPatch";

const ReplyOutput = ({ feedData, setFeedData }) => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");
  const comments = feedData.replies; // 댓글 안 답글

  return (
    <div>
      {comments &&
        comments.map((reply, idx) => (
          <div key={reply.feedReplyId}>
            {reply.comments &&
              reply.comments.map((comments, subIdx) => (
                <div
                  key={comments.feedReplyId}
                  className="flex items-start mt-10 ml-10 bg-[#fceecd75] p-8 rounded-lg shadow">
                  <img
                    src={`${reply.memberImage}`}
                    onClick={() => {
                      navigate(`/myinfo/${comments.memberId}`);
                    }}
                    className="w-10 h-10 mr-2.5 rounded-full object-cover"
                    alt="유저사진"
                  />
                  <div className="flex flex-col ml-4 w-full">
                    {/* 답변 작성자 */}
                    <span className="text-lg font-semibold">
                      {comments.nickname}
                    </span>

                    {/* 수정하기 */}
                    {/* <ReplyPatch/> */}
                    {comments.content}
                    {/* 댓글 내용 */}
                    <div className="flex items-center text-gray-500 font-medium text-base">
                      {/* 작성날짜 */}
                      <div className="flex items-center text-gray-500 font-medium text-base">
                        {/* 작성날짜 */}
                        <span className="mr-1">
                          {comments.createdDateTime.split("T")[0]}
                        </span>
                      </div>

                      {/* 수정 */}
                      {memberId == comments.memberId && (
                        <button
                          className="mx-2 hover:font-semibold"
                          onClick={() => {
                            // setEditComent({
                            //   ...editComent,
                            //   [comment.feedReplyId]: true,
                            // });
                          }}>
                          수정하기
                        </button>
                      )}
                      {/* 삭제 */}
                      {memberId == comments.memberId && (
                        <ReplyDelete comments={comments} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export default ReplyOutput;
