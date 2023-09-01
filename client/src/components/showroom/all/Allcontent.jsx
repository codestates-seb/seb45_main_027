import React, { useState } from "react";

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

const Allcontent = ({ viewportWidth, setViewportWidth }) => {
  const [image2, setImage2] = useState(data); // 이미지데이터를 상태로 저장

  // 북마크 상태를 변경시켜주는 함수
  const toggleBookmark = (idx) => {
    const updatedBookmarks = [...image2];
    updatedBookmarks[idx].isBookmarked = !updatedBookmarks[idx].isBookmarked;
    setImage2(updatedBookmarks);
    console.log(updatedBookmarks);
  };
  // width가 모바일인지 판별
  const isMobileView = viewportWidth < 720;

  //1350 이하
  return (
    <div className="flex-col ">
      <div className="flex pt-5 justify-between flex-wrap">
        {data.map((item, idx) => (
          <div
            key={idx}
            className={`flex-col relative mx-3 mb-3 ${
              isMobileView ? "w-[45%]" : "w-[30%]"
            } h-[20%]`}
          >
            <img
              src={item.url}
              alt="shroomimg"
              className="w-full h-[330px] rounded-xl "
            />
            <p>
              <img
                src={
                  item.isBookmarked
                    ? "./images/isBookmarked.png"
                    : "./images/Bookmark.png"
                }
                alt="Bookmark"
                className="absolute bottom-44 right-4 cursor-pointer"
                style={{
                  width: "30px",
                  height: "30px",
                }}
                onClick={() => toggleBookmark(idx)}
              />
            </p>
            <div className="flex-col pt-2 mb-8">
              <div className="flex justify-center mb-3">
                <span className="text-3xl font-bold">Title.</span>
              </div>
              <div className="flex justify-center mb-3">
                <img
                  src="./images/Wonho.png"
                  alt="프로필사진"
                  className="w-12 rounded-full mr-2"
                ></img>
                <span className="text-xl pt-[5px]">user name</span>
              </div>
              <div className="flex justify-center">
                <span className="pr-10 text-xl">스크랩: 0</span>
                <span className="text-xl"> 조회수: 1</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allcontent;
