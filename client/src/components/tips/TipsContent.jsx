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

  // 북마크 상태를 변경시켜주는 함수
  const toggleBookmark = (idx) => {
    const updatedBookmarks = [...image];
    updatedBookmarks[idx].isBookmarked = !updatedBookmarks[idx].isBookmarked;
    setImage2(updatedBookmarks);
    console.log(updatedBookmarks);
  };

  return (
    <div className="flex-col m-4">
      <div className="flex justify-between flex-wrap">
        {image.map((item, idx) => (
          <div
            key={idx}
            className="flex-col mx-3 mb-3 w-full sm:w-[45%] lg:w-[30%] h-[20%]">
            <div className="relative">
            <img
              src={item.url}
              alt="tipsimg"
              className="aspectRatioImage_1_1 rounded-md"
            />
            <p>
              <img
                src={
                  item.isBookmarked
                    ? "./images/isBookmarked.png"
                    : "./images/Bookmark.png"
                }
                alt="Bookmark"
                className="absolute w-10 h-10 bottom-4 right-4 cursor-pointer"
                onClick={() => toggleBookmark(idx)}
              />
            </p>
          </div>
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
