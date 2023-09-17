import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../common/tokens";

const ReplyInput = ({ comment, commentId, feedData, setFeedData }) => {
  const { feedId } = useParams(); // 게시물 번호
  const comments = comment.comments; // 댓글 안 답글

  // 입력할 답글
  const [inputReply, setInputReply] = useState("");
  // 입력한 답글
  const [enterReply, setEnterReply] = useState([]);
  // 답글 인덱스 초기화
  const [indexReply, setIndexReply] = useState(1);

  //POST 요청
  const postReply = async (feedReplyId) => {
    const configParams = {
      method: "POST",
      url: `/feed/${feedId}/feedReply/${feedReplyId}/feedComment`,
      // 코멘트 아이디까지 가져오기

      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
      data: {
        content: inputReply,
      },
    };

    console.log(feedData);
    console.log(comment);
    console.log(commentId);
    try {
      const res = await api(configParams);
      if (res && res.status === 200) {
        const newComment = res.data;

        // 답글 배열에 새 답글 추가
        const updatedComments = [...comments, newComment];

        // 댓글 객체에 업데이트된 답글 배열을 설정
        const updatedComment = {
          ...comment,
          comments: updatedComments,
        };

        // 상위 컴포넌트에서 넘어온 feedData를 기반으로 업데이트
        const updatedFeedData = feedData.map((feedItem) => {
          // 현재 댓글이 속한 피드를 찾음
          if (feedItem.commentId === feedId) {
            const updatedComments = feedItem.comments.map((cmt) => {
              // 현재 댓글을 찾아서 업데이트
              if (cmt.commentId === commentId) {
                return updatedComment;
              }
              return cmt;
            });
            // 피드의 comments를 업데이트
            return { ...feedItem, comments: updatedComments };
          }
          return feedItem;
        });

        // 피드 데이터 상태 업데이트
        setFeedData(updatedFeedData);

        // 로컬 상태 업데이트
        setInputReply("");
        setEnterReply(updatedComments);
      } else {
        console.error("status code:", res?.status, res?.data);
        toast.error("답글을 추가할 수 없습니다.");
      }
    } catch (err) {
      console.error("err comment:", err);
      toast.error("답글을 추가할 수 없습니다.");
    }
  };

  // 엔터 누르면 자동으로 입력
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      postReply(comment.feedReplyId);
    }
  };

  return (
    <div className="w-full flex mt-6">
      <img
        src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
        alt="유저사진"
      />
      <div className="flex w-full relative">
        <input
          className="h-full w-full ml-4 border rounded-lg pl-4"
          value={inputReply}
          onKeyDown={handleEnter}
          onChange={(e) => setInputReply(e.target.value)}
        />
        <button
          className="absolute right-0 top-1/4 pr-4"
          onClick={() => {
            postReply(comment.feedReplyId);
          }}>
          입력
        </button>
      </div>
    </div>
  );
};

export default ReplyInput;
