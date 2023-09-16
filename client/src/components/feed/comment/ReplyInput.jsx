import React from 'react';

const ReplyInput = ({ commentId, feedData, setFeedData }) => {

  return (
    <div className="w-full flex mt-6">
      <img
        src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
        alt="유저사진"
      />
      <div className="flex w-full relative">
        <input
          className="h-full w-full ml-4 border rounded-lg pl-4"
          // value={replyInput[comment.id] || ""}
          // onChange={(e) =>
          //   setReplyInput({
          //     ...replyInput,
          //     [comment.id]: e.target.value,
          //   })
          // }
        />
        <button
          className="absolute right-0 top-1/4 pr-4"
          // onClick={() => handleReplySubmit(comment.id)}
        >
          입력
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;