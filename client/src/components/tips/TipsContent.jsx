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
  const isMobile = viewportWidth >= 690; // 모바일일경우 판별
  const navigate = useNavigate();
  const imageClassName = isMobile
    ? "w-[320px] h-[300px] rounded-xl"
    : "w-[400px] h-[300px] rounded-xl"; // 모바일일경우 이미지 속성을 정의하는 cn

  // 게시글 클릭시 페이지 이동하는 핸들러 함수
  const handleTipClick = (tipId) => {
    navigate(`/tips/${tipId}`);
  };
  return (
    <div className="flex-col m-4">
      <div className="flex pt-5 md:justify-between justify-center flex-wrap">
        {image.map((item, idx) => (
          <div key={idx} className="flex-col relative mx-3 mb-3 ">
            <img
              src={item.url}
              alt="tipsimg"
              className="aspectRatioImage_1_1 rounded-md"
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
                className="absolute bottom-32 right-4 cursor-pointer"
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            </p>
            <TipsInfo handleTipClick={handleTipClick} item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsContent;
