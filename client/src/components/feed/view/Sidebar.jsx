import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAxios from "../../../hooks/useAxios";

const display =
  "flex justify-center items-center w-20 h-20 bg-white border rounded-full shadow my-8 ";

const Sidebar = ({ commentSectionRef, setFeedData, feedData }) => {
  const [like, setLike] = useState("");
  const [bookmark, setBookmark] = useState("");
  const { feedId, tipId } = useParams();

  const someCondition = feedId ? true : false;
  // 북마크 상태
  const [resBookMark, errBookMark, loadingBookMark, fetchBookmarkData] =
    useAxios(
      {
        method: "PATCH",
        url: someCondition
          ? `/feed/${feedId}/feedBookMark`
          : `/tip/${tipId}/tipbookmark`,
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      },
      false
    );

  const toggleBookmark = () => {
    fetchBookmarkData();
    setBookmark(!bookmark);
  };

  // 좋아요 상태
  const [resLike, errLike, loadingLike, fetchLikeData] = useAxios(
    {
      method: "PATCH",
      url: someCondition
        ? `/feed/${feedId}/feedlike`
        : `/tip/${tipId}/tiplike`,
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    },
    false
  );

  const toggleLike = () => {
    fetchLikeData();
    setLike(!like);
  };

  // [좋아요/북마크] 받아온 요청 상태 저장
  useEffect(() => {
    if (feedData) {
      setBookmark(feedData.bookMarkYn || feedData.bookmarkYn);
      setLike(feedData.likeYn);
    }
  }, [feedData]);


  // 댓글 스크롤이동
  const scrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const linkShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast("링크가 복사되었습니다.");
      })
      .catch((err) => {
        toast("링크 복사에 실패했습니다.");
      });
  };
  
  return (
    <div className="hidden md:flex flex-col w-max h-0 sticky top-48 float-right mr-20 z-50">
      {/* 좋아요 */}
      <button className={display} onClick={toggleLike}>
        <img
          className="m-4"
          src={
            like
              ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-on.png"
              : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart-off.png"
          }
          alt="좋아요"
        />
      </button>

      {/* 북마크 */}
      <button className={display} onClick={toggleBookmark}>
        <img
          className="m-4"
          src={
            bookmark
              ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/bookmark-on.png"
              : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/bookmark-off.png"
          }
          alt="북마크"
        />
      </button>

      {/* 댓글 */}
      <button className={display} onClick={scrollToComments}>
        <img
          className="m-5"
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/side-speech-bubble.png"
          alt="댓글"
        />
      </button>

      {/* 공유 */}
      <button className={`${display} pr-2.5`} onClick={linkShare}>
        <img
          className="m-4"
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/side-share.png"
          alt="공유"
        />
      </button>
    </div>
  );
};

export default Sidebar;
