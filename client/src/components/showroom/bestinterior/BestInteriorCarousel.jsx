import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import "./BestInteriorCarousel.css";

const BestInteriorCarousel = ({ viewportWidth, best10Data }) => {
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
  const toggleBookmark = (idx) => {
    console.log(idx);
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
        className="absolute w-12 h-12 bottom-0 right-1"
        onClick={(event) => {
          event.stopPropagation(); // 이벤트캡쳐링 방지
          toggleBookmark(idx);
        }}
      >
        <img
          src={
            data.bookMarkYn
              ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/isBookmarked.png"
              : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/bookmark.png"
          }
          alt="Bookmark"
          className="absolute bottom-3 right-7 cursor-pointer"
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
        className=""
        // onClickItem={toggleBookmark}
      >
        {renderSlides}
      </Carousel>
    </div>
  );
};

export default BestInteriorCarousel;
