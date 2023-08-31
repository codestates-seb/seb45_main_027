import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const data = [
  { url: "./asset/image.png" },
  { url: "./asset/image2.png" },
  { url: "./asset/image3.png" },
  { url: "./asset/image4.png" },
  { url: "./asset/image.png" },
  { url: "./asset/image2.png" },
  { url: "./asset/image3.png" },
  { url: "./asset/image4.png" },
];

const renderSlides = data.map((image, idx) => (
  <div key={idx} className="px-2">
    <img src={image.url} alt={image.url} />
  </div>
));

const BestInteriorCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState();
  function handleChange(index) {
    setCurrentIndex(index);
  }

  return (
    <div className="flex justify-center content-center py-5 px-3 ">
      <Carousel
        showArrows={true}
        centerMode={true}
        centerSlidePercentage={20}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        // className="w-[700px] h-[200px] "
      >
        {renderSlides}
      </Carousel>
    </div>
  );
};

export default BestInteriorCarousel;
