import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../common/tokens";

const display =
  "flex justify-center items-center w-20 h-20 bg-white border rounded-full shadow my-8 ";

const Sidebar = ({ commentSectionRef, setFeedData, feedData }) => {
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");
  const [like, setLike] = useState("");
  const [bookmark, setBookmark] = useState("");
  const { feedId, tipId } = useParams();
  const [animationLike, setAnimationLike] = useState("");
  const [animationBookmark, setAnimationBookmark] = useState("");

  const someCondition = feedId ? true : false;
  // 좋아요 PATCH 요청 함수
  const toggleLike = async () => {
    try {
      // PATCH 요청 보내기
      const response = await api.patch(
        someCondition ? `/feed/${feedId}/feedlike` : `/tip/${tipId}/tiplike`,
        {},
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      // 좋아요 상태 업데이트
      setLike(response.data.data.likeYn);

      // 애니메이션 클래스 설정
      setAnimationLike("animate__bounceIn");

      // 애니메이션이 끝난 후 클래스를 제거
      setTimeout(() => {
        setAnimationLike("");
      }, 500); // 애니메이션 지속 시간

      // feedData 상태 업데이트
      setFeedData((prevFeedData) => ({
        ...prevFeedData,
        likeYn: response.data.data.likeYn, // feedData의 likeYn을 업데이트
        likeCount: response.data.data.likeCount,
      }));
    } catch (error) {
      toast.error("로그인이 필요한 서비스 입니다.");
      localStorage.setItem("prevPath", window.location.pathname);
      navigate("/login");
      console.error("좋아요 토글 실패:", error);
    }
  };

  // 북마크 PATCH 요청 함수
  const toggleBookmark = async () => {
    try {
      // PATCH 요청 보내기
      const response = await api.patch(
        someCondition
          ? `/feed/${feedId}/feedBookMark`
          : `/tip/${tipId}/tipbookmark`,
        {},
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      // 북마크 상태 업데이트
      setBookmark(
        response.data.data.bookMarkYn || response.data.data.bookmarkYn
      );

      // 애니메이션 클래스 설정
      setAnimationBookmark("animate__bounceIn");

      // 애니메이션이 끝난 후 클래스를 제거
      setTimeout(() => {
        setAnimationBookmark("");
      }, 500); // 애니메이션 지속 시간

      // feedData 상태 업데이트
      setFeedData((prevFeedData) => ({
        ...prevFeedData,
        bookMarkYn: response.data.data.bookMarkYn, // feedData의 bookMarkYn을 업데이트
        bookmarkYn: response.data.data.bookmarkYn, // feedData의 bookmarkYn을 업데이트
        bookMarkCount: response.data.data.bookMarkCount,
        bookmarkCount: response.data.data.bookmarkCount,
      }));
    } catch (error) {
      toast.error("로그인이 필요한 서비스 입니다.");
      localStorage.setItem("prevPath", window.location.pathname);
      navigate("/login");
      console.error("북마크 토글 실패:", error);
    }
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
          className={`m-4 ${animationLike}`}
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
          className={`m-4 ${animationBookmark}`}
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
