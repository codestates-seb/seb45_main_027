import React, { forwardRef } from "react";
import CommentInput from "./CommentInput";
import CommentOutput from "./CommentOutput";

const CommentWrap = forwardRef(({ feedData, setFeedData }, ref) => {
  return (
    <div className=" relative mt-10 min-h-full" ref={ref}>
      {/* ref는 사이드바 댓글 스크롤때문에 존재 */}
      {/* 댓글 입력창 */}
      <CommentInput feedData={feedData} setFeedData={setFeedData} />
      {/* 댓글 출력창 */}
      <CommentOutput feedData={feedData} setFeedData={setFeedData} />
    </div>
  );
});

export default CommentWrap;
