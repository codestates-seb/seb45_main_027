import React, { useState, forwardRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";
import api from "../../common/tokens";

//  함수형 컴포넌트는 ref 속성을 가질 수 없지만, forwardRef를 사용하면 이러한 제약을 우회할 수 있다.
const Comment = forwardRef(({ feedData }, ref) => {
  // 사이드바에서 댓글 클릭시 이동을 위해 받아 옴.
  // 댓글 좋아요
  const [like, setLike] = useState("");
  // 답글 달기
  const [showReply, setShowReply] = useState({});
  // 댓글 수정 상태 저장
  const [editComent, setEditComent] = useState({});
  const [newContent, setNewContent] = useState({});
  // 댓글/답글 입력값을 저장할 State
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  // 작성된 댓글/답글을 저장할 State
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState({});

  const { feedId } = useParams(); // 게시물 번호

  // 좋아요 각 상태관리
  const toggleLike = (comment) => {
    setLike((prevLikes) => ({
      ...prevLikes,
      [comment]: !prevLikes[comment],
    }));
  };

  

  //POST 요청
  const [res, err, loading, fetchData] = useAxios(
    {
      method: "POST",
      url: `/feed/${feedId}/feedReply`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    },
    false
  );

  const postComment = async () => {
  try {
    const response = await fetchData({
      data: {
        text: commentInput,
      },
    });

    if (response.status === 200) { // 상태 코드 확인
      const newComment = response.data;
      setComments((prevComments) => [...prevComments, newComment]);
      
      setCommentInput("");
    } else {
      console.error("Received unexpected status code:", response.status, response.data);
      toast.error("댓글을 추가할 수 없습니다.");
    }
  } catch (error) {
    console.error("Error comment:", error);  // 에러 로깅
    toast.error("댓글을 추가할 수 없습니다.");
  }
};
  //PATCH 요청
  const [patchRes, patchErr, patchLoading, fetchPatchData] = useAxios(
    {
      method: "PATCH",
      url: `/feed/${feedId}/feedReply`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    },
    false
  );

  const patchComment = async (feedReplyId, newContent) => {
    try {
      const response = await fetchPatchData({
        url: `/feed/${feedId}/feedReply/${feedReplyId}`,
        data: {
          text: newContent,
        },
      });

      if (response && response.status === 200) {
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (comment.feedReplyId === feedReplyId) {
              return { ...comment, content: newContent };
            }
            return comment;
          })
        );
        setEditComent({ [feedReplyId]: false }); 
      } else {
        toast.error("댓글을 수정하지 못했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      toast.error("댓글을 수정하는 중 오류가 발생했습니다.");
    }
  };

  // DELETE 요청
  const [deleteRes, deleteErr, deleteLoading, fetchDeleteData] = useAxios(
    {
      method: "DELETE",
      url: `/feed/${feedId}/feedReply`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    },
    false
  );

  const deleteComment = (feedReplyId) => {
    fetchDeleteData({ url: `/feed/${feedId}/feedReply/${feedReplyId}` });
    if (deleteRes && deleteRes.status === 200) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.feedReplyId !== feedReplyId)
      );
    }
  };

  // feedData를 replies 담기
  useEffect(() => {
    if (feedData) {
      setComments(feedData.replies);
    }
  }, [feedData]);

  console.log(comments);

  return (
    <div className="mt-10" ref={ref}>
      {/* 댓글 수 표시 */}
      <div className="flex">
        <span className="text-xl font-semibold">댓글</span>
        <span className="text-xl font-semibold text-[#35C5F0] ml-2">
          {feedData.repliesCount}
        </span>
      </div>
      {/* 댓글 입력창 */}
      <div className="flex w-full mt-4">
        <img
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
          alt="유저사진"
        />
        <div className="flex w-full relative">
          <input
            className="h-full w-full ml-4 border rounded-lg pl-4"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            className="absolute right-0 top-1/4 pr-4"
            onClick={() => postComment(comments.id)}>
            입력
          </button>
        </div>
      </div>
      {/* 댓글 출력창 */}
      {comments &&
        comments.map((comment, index) => (
          <div key={comment.id} className="flex flex-col mt-10">
            <div className="bg-[#fceecd75] p-8 rounded-lg shadow">
              <div className="flex items-start">
                <img
                  src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/userComment.png"
                  alt="유저사진"
                />
                <div className="flex flex-col ml-4 w-full">
                  <span className="text-lg font-semibold">
                    {comment.nickname}
                  </span>
                  <span className="my-4 text-base">
                    {editComent[comment.feedReplyId] ? (
                      <input
                        type="text"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            patchComment(comment.feedReplyId, newContent);
                          }
                        }}
                      />
                    ) : (
                      comment.content
                    )}
                  </span>
                  {/* 작성날짜, 좋아요, 답글 */}
                  <div className="flex items-center text-gray-500 font-medium text-base">
                    {/* 작성날짜 */}
                    <span className="mr-2.5">{comment.createdDateTime}</span>
                    {/* 좋아요 */}
                    <button
                      className="flex items-center"
                      onClick={() => toggleLike(comment)}>
                      <img
                        className="w-6 h-6 mr-1"
                        src={
                          like[comment]
                            ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-on.png"
                            : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-off.png"
                        }
                        alt="좋아요"
                      />
                      <span className="mr-1">좋아요</span>
                    </button>
                    {/* 답글 */}
                    <button
                      className="mx-2"
                      >
                      답글 달기
                    </button>
                    {/* 수정 */}
                    <button
                      className="mx-2"
                      onClick={() => {
                        setEditComent({
                          [comment.feedReplyId]: true,
                        });
                      }}>
                      수정하기
                    </button>
                    {/* 삭제 */}
                    <button
                      className="mx-2"
                      onClick={() => {
                        deleteComment(comment.feedReplyId);
                      }}>
                      삭제하기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
});

export default Comment;