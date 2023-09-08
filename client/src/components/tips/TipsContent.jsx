import React, { useState } from "react";
import TipsInfo from "./TipsInfo";
import { useNavigate } from "react-router-dom";

const data = [
  { url: "./asset/image.png", isBookmarked: true, tipId: 1 },
  { url: "./asset/image2.png", isBookmarked: false, tipId: 2 },
  { url: "./asset/image3.png", isBookmarked: false, tipId: 3 },
  { url: "./asset/image4.png", isBookmarked: false, tipId: 4 },
  { url: "./asset/image.png", isBookmarked: false, tipId: 5 },
  { url: "./asset/image2.png", isBookmarked: false, tipId: 6 },
  { url: "./asset/image3.png", isBookmarked: false, tipId: 7 },
  { url: "./asset/image4.png", isBookmarked: false, tipId: 8 },
  { url: "./asset/image.png", isBookmarked: true, tipId: 9 },
  { url: "./asset/image2.png", isBookmarked: false, tipId: 10 },
  { url: "./asset/image3.png", isBookmarked: false, tipId: 11 },
  { url: "./asset/image4.png", isBookmarked: false, tipId: 12 },
  { url: "./asset/image.png", isBookmarked: false, tipId: 13 },
  { url: "./asset/image2.png", isBookmarked: false, tipId: 14 },
  { url: "./asset/image3.png", isBookmarked: false, tipId: 15 },
  { url: "./asset/image4.png", isBookmarked: false, tipId: 16 },
  { url: "./asset/image.png", isBookmarked: true, tipId: 17 },
  { url: "./asset/image2.png", isBookmarked: false, tipId: 18 },
  { url: "./asset/image3.png", isBookmarked: false, tipId: 19 },
  { url: "./asset/image4.png", isBookmarked: false, tipId: 20 },
  { url: "./asset/image.png", isBookmarked: false, tipId: 21 },
  { url: "./asset/image2.png", isBookmarked: false, tipId: 22 },
  { url: "./asset/image3.png", isBookmarked: false, tipId: 23 },
  { url: "./asset/image4.png", isBookmarked: false, tipId: 24 },
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
 
  const navigate = useNavigate();
  

  // 게시글 클릭시 페이지 이동하는 핸들러 함수
  const handleTipClick = (tipId) => {
    navigate(`/tips/${tipId}`);
  };
  return (
    <div className="flex-col m-4">
      <div className="flex justify-between flex-wrap">
        {image.map((item, idx) => (
          <div
            key={idx}
            className="flex-col mx-3 mb-3 w-full sm:w-[45%] md:w-[30%] lg:w-[23%] h-[20%]">
            <div className="relative">
              <img
                src={item.url}
                alt="tipsimg"
                className="aspectRatioImage_1_1 rounded-md cursor-pointer"
                onClick={() => handleTipClick(item.tipId)}
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
            <TipsInfo handleTipClick={handleTipClick} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsContent;
