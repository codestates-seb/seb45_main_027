import React from "react";
import ReplyInput from "./ReplyInput";
import ReplyOutput from "./ReplyOutput";

const ReplyWrap = ({ commentId, feedData, setFeedData }) => {
  return (
    <div>
      <ReplyInput
        commentId={commentId}
        feedData={feedData}
        setFeedData={setFeedData}
      />
      <ReplyOutput
        commentId={commentId}
        feedData={feedData}
        setFeedData={setFeedData}
      />
    </div>
  );
};

export default ReplyWrap;
