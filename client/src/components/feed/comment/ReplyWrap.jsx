import React from "react";
import ReplyInput from "./ReplyInput";
import ReplyOutput from "./ReplyOutput";

const ReplyWrap = ({  replies, setReplies, commentId, feedData, setFeedData, comment }) => {
  
  console.log();
  
  return (
    <div>
      <ReplyInput
        comment={comment}
        commentId={commentId}
        feedData={feedData}
        setFeedData={setFeedData}
      />

      
        <ReplyOutput
          commentId={commentId}
          feedData={feedData}
          setFeedData={setFeedData}
          comment={comment}
          replies={replies}
          setReplies={setReplies}
        />
    </div>
  );
};

export default ReplyWrap;
