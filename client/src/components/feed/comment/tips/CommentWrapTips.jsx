import React, { forwardRef } from "react";
import CommentInputTips from "./CommentInputTips";
import CommentOutputTips from "./CommentOutputTips";

const CommentWrapTips = forwardRef(({ feedData, setFeedData }, ref) => {
  return (
    <div className=" relative mt-10 min-h-full" ref={ref}>
      {/* ref는 사이드바 댓글 스크롤때문에 존재 */}
      {/* 댓글 입력창 */}
      <CommentInputTips feedData={feedData} setFeedData={setFeedData} />
      {/* 댓글 출력창 */}
      <CommentOutputTips feedData={feedData} setFeedData={setFeedData} />
    </div>
  );
});

export default CommentWrapTips;
