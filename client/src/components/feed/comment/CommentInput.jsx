import React, { useState,  useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const CommentInput = ({ feedData }) => {
  return (
    <>
      {/* 댓글 수 표시 */}
      <div className="flex">
        <span className="text-xl font-semibold">댓글</span>
        <span className="text-xl font-semibold text-[#35C5F0] ml-2">
          {feedData.repliesCount}
        </span>
      </div>
      <div className="flex w-full mt-4">
        <img
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
          alt="유저사진"
        />
        <div className="flex w-full relative">
          <input
            className="h-full w-full ml-4 border rounded-lg pl-4"
            //   value={}
            //   onChange={}
          />
          <button
            className="absolute right-0 top-1/4 pr-4"
            //   onClick={() => postComment(comments.id)}
          >
            입력
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentInput;
