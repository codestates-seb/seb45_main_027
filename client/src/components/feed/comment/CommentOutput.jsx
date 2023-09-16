import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../common/tokens";
import CommentDelete from "./CommentDelete";

const CommentOutput = ({ feedData }) => {
    const profileImg = localStorage.getItem("profileImg");
    // 댓글 좋아요
    const [like, setLike] = useState("");
    // feedData 안에 댓글 접근
    const [replies, setReplies] = useState("");
    
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
          <div key={comment.id} className="flex flex-col mt-10">
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
                  <span className="my-4 text-base">{comment.content}</span>
                  {/* 작성날짜, 좋아요, 답글 */}
                  <div className="flex items-center text-gray-500 font-medium text-base">
                    {/* 작성날짜 */}
                    <span className="mr-2.5">
                      {comment.createdDateTime.split("T")[0]}
                    </span>
                    {/* 좋아요 */}
                    <button
                      className="flex items-center"
                      onClick={() => setLike(!like)}>
                      <img
                        className="w-6 h-6 mr-1"
                        src={
                          like
                            ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-on.png"
                            : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-off.png"
                        }
                        alt="좋아요"
                      />
                      <span className="mr-1">좋아요</span>
                    </button>
                    {/* 답글 */}
                    <button className="mx-2">답글 달기</button>
                    {/* 수정 */}
                    <button
                      className="mx-2"
                      // onClick={}
                    >
                      수정하기
                    </button>
                    {/* 삭제 */}
                    <CommentDelete
                      comment={comment}
                      replies={replies}
                      setReplies={setReplies}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentOutput;
