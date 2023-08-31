import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const data = [
  { url: "./asset/image.png", isBookmarked: true },
  { url: "./asset/image2.png", isBookmarked: false },
  { url: "./asset/image3.png", isBookmarked: false },
  { url: "./asset/image4.png", isBookmarked: false },
  { url: "./asset/image.png", isBookmarked: false },
  { url: "./asset/image2.png", isBookmarked: false },
  { url: "./asset/image3.png", isBookmarked: false },
  { url: "./asset/image4.png", isBookmarked: false },
];

const BestInteriorCarousel = ({ viewportWidth, setViewportWidth }) => {
  const [numVisibleSlides, setNumVisibleSlides] = useState(20); // 캐러셀 사진 크기를 반응형으로 제어하기 위한 상태
  const [image, setImage] = useState(data); // 북마크상태를 변경시킬 상태

  // 반응형 구현 로직
  const updateVisibleSlides = () => {
    if (viewportWidth <= 1440) {
      if (viewportWidth <= 1024) {
        setNumVisibleSlides(50);
      } else {
        setNumVisibleSlides(30);
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
    const updatedBookmarks = [...image];
    updatedBookmarks[idx].isBookmarked = !updatedBookmarks[idx].isBookmarked;
    setImage(updatedBookmarks);
    console.log(updatedBookmarks);
  };

  const renderSlides = data.map((image, idx) => (
    <div key={idx} className="px-4 relative cursor-pointer">
      <img src={image.url} alt={image.url} className="rounded-lg " />
      <p>
        <img
          src={
            image.isBookmarked
              ? "./images/isBookmarked.png"
              : "./images/Bookmark.png"
          }
          alt="Bookmark"
          className="absolute bottom-3 right-7 cursor-pointer"
          style={{
            width: "30px",
            height: "30px",
          }}
          onClick={() => toggleBookmark(idx)}
        />
      </p>
    </div>
  ));

  return (
    <div className="flex justify-center content-center py-5 px-3 ">
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
        selectedItem={3}
        showIndicators={false}
        onClickItem={toggleBookmark}
      >
        {renderSlides}
      </Carousel>
    </div>
  );
};

export default BestInteriorCarousel;
