import React, { useState, forwardRef,  useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import CommentInput from "./CommentInput";
import CommentOutput from "./CommentOutput";

const CommentWrap = forwardRef(({ feedData }, ref) => {
    
console.log(feedData);
console.log(feedData.replies); // 댓글

    return (
      <div className="mt-10" ref={ref}>
        {" "}
        {/* ref는 사이드바 댓글 스크롤때문에 존재 */}
        <CommentInput feedData={feedData} /> {/* 댓글 입력창 */}
        <CommentOutput feedData={feedData} /> {/* 댓글 출력창 */}
      </div>
    );
});

export default CommentWrap;