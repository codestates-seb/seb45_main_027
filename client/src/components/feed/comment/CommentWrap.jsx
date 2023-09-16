import React, { forwardRef } from "react";
import CommentInput from "./CommentInput";
import CommentOutput from "./CommentOutput";

const CommentWrap = forwardRef(({ feedData, setFeedData }, ref) => {
  return (
    <div className="mt-10" ref={ref}>
      {/* ref는 사이드바 댓글 스크롤때문에 존재 */}
      <CommentInput feedData={feedData} setFeedData={setFeedData} />
      {/* 댓글 입력창 */}
      <CommentOutput feedData={feedData} /> {/* 댓글 출력창 */}
    </div>
  );
});

export default CommentWrap;