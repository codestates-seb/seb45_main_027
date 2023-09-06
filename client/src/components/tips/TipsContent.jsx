import React, { useState } from "react";
import TipsInfo from "./TipsInfo";
import { Link } from "react-router-dom";

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
  { url: "./asset/image.png", isBookmarked: true },
  { url: "./asset/image2.png", isBookmarked: false },
  { url: "./asset/image3.png", isBookmarked: false },
  { url: "./asset/image4.png", isBookmarked: false },
  { url: "./asset/image.png", isBookmarked: false },
  { url: "./asset/image2.png", isBookmarked: false },
  { url: "./asset/image3.png", isBookmarked: false },
  { url: "./asset/image4.png", isBookmarked: false },
];

const TipsContent = ({ viewportWidth }) => {
  const [image, setImage2] = useState(data); // 이미지데이터를 상태로 저장
  const isMobile = viewportWidth >= 690; // 모바일일경우 판별
  const imageClassName = isMobile
    ? "w-[320px] h-[300px] rounded-xl"
    : "w-[400px] h-[300px] rounded-xl"; // 모바일일경우 이미지 속성을 정의하는 cn

  return (
    <div className="flex-col mt-4">
      <div className="flex pt-5 md:justify-between justify-center flex-wrap">
        {image.map((item, idx) => (
          <div key={idx} className="flex-col relative mx-3 mb-3 ">
            <img
              src={item.url}
              alt="tipsimg"
              className="aspectRatioImage_4_3"
            />
            <p>
              <img
                src={
                  item.isBookmarked
                    ? "./images/isBookmarked.png"
                    : "./images/Bookmark.png"
                }
                alt="Bookmark"
                className="absolute bottom-32 right-4 cursor-pointer"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </p>
            <Link to=":id/view">
              <TipsInfo />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsContent;
