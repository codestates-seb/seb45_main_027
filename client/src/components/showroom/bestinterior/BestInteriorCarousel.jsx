import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import "./BestInteriorCarousel.css";
import api from "../../common/tokens";
import toast from "react-hot-toast";

const BestInteriorCarousel = ({ viewportWidth, best10Data, setBest10Data }) => {
  const [numVisibleSlides, setNumVisibleSlides] = useState(20); // 캐러셀 사진 크기를 반응형으로 제어하기 위한 상태
  const navigate = useNavigate();
  // 반응형 구현 로직

  const updateVisibleSlides = () => {
    if (viewportWidth <= 1440) {
      if (viewportWidth <= 1024) {
        setNumVisibleSlides(66.6);
      } else {
        setNumVisibleSlides(33.3);
      }
    } else {
      setNumVisibleSlides(20);
    }
  };
  // viewportWidth 변화시마다 케러셀 사이즈를 설정해주는 useEffect
  useEffect(() => {
    window.addEventListener("resize", updateVisibleSlides);
    updateVisibleSlides();
    return () => {
      window.removeEventListener("resize", updateVisibleSlides);
    };
  }, [viewportWidth]);

  // 북마크 상태를 변경시켜주는 함수
  const toggleBookmark = async (feedId) => {
    try {
      // API 호출을 위한 설정 객체
      const configParams = {
        method: "PATCH",
        url: `/feed/${feedId}/feedBookMark`,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
      };

      // API 호출
      const response = await api(configParams);

      // API 호출이 성공했을 때 이미지 상태 업데이트
      if (response.status === 200) {
        // showroomData 배열을 복사하여 새로운 배열을 생성
        const updatedBest10Data = [...best10Data];

        // feedId와 일치하는 요소 찾기
        const updatedItemIndex = updatedBest10Data.findIndex(
          (item) => item.feedId === feedId
        );

        if (updatedItemIndex !== -1) {
          // feedId가 일치하는 요소가 있다면 bookMarkYn 값을 업데이트
          if (response.data.data.bookMarkYn === true) {
            toast.success("북마크가 등록되었습니다!");
          } else {
            toast.success("북마크가 해제되었습니다!");
          }

          updatedBest10Data[updatedItemIndex].bookMarkYn =
            response.data.data.bookMarkYn;
          setBest10Data(updatedBest10Data); // 업데이트된 배열을 상태로 설정
        }
      }
    } catch (error) {
      toast.error("로그인이 필요한 서비스 입니다.");
      localStorage.setItem("prevPath", window.location.pathname);
      navigate("/login");
      console.error("북마크 토글 실패:", error);
    }
  };
  // 게시글 클릭시 해당 게시물로 이동하는 함수
  const handleFeedClick = (feedId) => {
    navigate(`/showroom/${feedId}`);
  };

  const renderSlides = best10Data.map((data, idx) => (
    <div
      key={idx}
      className="px-4 relative cursor-pointer"
      onClick={() => handleFeedClick(data.feedId)}
    >
      <img
        src={data.coverPhoto}
        alt={data.coverPhoto}
        className="rounded-xl "
      />
      <p
        className="absolute w-20 h-12 bottom-[1px] right-7"
        onClick={(event) => {
          event.stopPropagation(); // 이벤트캡쳐링 방지
          toggleBookmark(data.feedId);
        }}
      >
        <img
          src={
            data.bookMarkYn
              ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/isBookmarked.png"
              : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/bookmark.png"
          }
          alt="Bookmark"
          className="absolute cursor-pointer"
          style={{
            width: "30px",
            height: "30px",
          }}
        />
      </p>
    </div>
  ));

  return (
    <div className="py-5 px-8 md:px-3 w-full">
      <Carousel
        showArrows={true}
        centerMode={true}
        centerSlidePercentage={numVisibleSlides} //반응형
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        swipeable={true}
        emulateTouch={true}
        selectedItem={5}
        showIndicators={false}
        stopOnHover={true}
        swipeScrollTolerance={0.00001}
      >
        {renderSlides}
      </Carousel>
    </div>
  );
};

export default BestInteriorCarousel;
