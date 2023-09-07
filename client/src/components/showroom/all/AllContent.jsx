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

const AllContent = () => {
  const [image, setImage2] = useState(data); // 이미지데이터를 상태로 저장

  // 북마크 상태를 변경시켜주는 함수
  const toggleBookmark = (idx) => {
    const updatedBookmarks = [...image];
    updatedBookmarks[idx].isBookmarked = !updatedBookmarks[idx].isBookmarked;
    setImage2(updatedBookmarks);
    console.log(updatedBookmarks);
  };
  
  return (
    <div className="flex-col mx-4">
      <div className="flex justify-between flex-wrap">
        {image.map((item, idx) => (
          <div
            key={idx}
            className="flex-col mx-3 mb-3 w-full sm:w-[45%] lg:w-[30%] h-[20%]">
            <div className="relative">
              <img
                src={item.url}
                alt="shroomimg"
                className="aspectRatioImage_4_3 rounded-md"
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
            <div className="flex-col pt-2 mb-14">
              <div className="flex justify-center my-3">
                <span className="text-3xl font-semibold">Title.</span>
              </div>
              <div className="flex justify-center items-center mb-3 text-gray-800">
                <img
                  src="./images/Wonho.png"
                  alt="프로필사진"
                  className="w-6 h-6 rounded-full mr-2"></img>
                <span className="text-xl">user name</span>
              </div>
              <div className="flex justify-center text-lg text-gray-500">
                <div className="mr-10">
                  <span>스크랩 :</span>
                  <span className="ml-1">0</span>
                </div>
                <div>
                  <span>조회수 :</span>
                  <span className="ml-1">0</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllContent;
