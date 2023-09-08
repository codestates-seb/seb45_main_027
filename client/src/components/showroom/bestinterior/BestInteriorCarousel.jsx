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
  { url: "./asset/image.png", isBookmarked: true },
  { url: "./asset/image2.png", isBookmarked: false },
  { url: "./asset/image3.png", isBookmarked: false },
  { url: "./asset/image4.png", isBookmarked: false },
  { url: "./asset/image.png", isBookmarked: false },
  { url: "./asset/image2.png", isBookmarked: false },
  { url: "./asset/image3.png", isBookmarked: false },
  { url: "./asset/image4.png", isBookmarked: false },
];

const BestInteriorCarousel = ({ viewportWidth, showroomData }) => {
  const [numVisibleSlides, setNumVisibleSlides] = useState(20); // 캐러셀 사진 크기를 반응형으로 제어하기 위한 상태
  const [image, setImage] = useState(data); // 이미지데이터를 상태로 저장

  // 반응형 구현 로직
  const updateVisibleSlides = () => {
    if (viewportWidth <= 1440) {
      if (viewportWidth <= 1024) {
        setNumVisibleSlides(35);
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
      <img src={image.url} alt={image.url} className="rounded-xl " />
      <p
        className="absolute w-12 h-12 bottom-0 right-1"
        onClick={() => toggleBookmark(idx)}
      >
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
        />
      </p>
    </div>
  ));

  return (
    <div className="py-5 px-8 md:px-3 w-full ">
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
