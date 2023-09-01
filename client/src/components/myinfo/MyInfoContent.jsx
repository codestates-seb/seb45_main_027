import React from "react";
//import MyInfoBookmark from "./MyInfoBookmark";

const MyInfoContent = ({ imgSrc, title, toggleBookmark, isBookmarked, itemId }) => {
  return (
    <div className="m-4 h-full w-[140px] md:w-[180px] ">
      <div className="relative">
        <img
          className="rounded-lg object-cover w-[140px] h-[130px] md:w-[180px] md:h-[170px]"
          src={imgSrc}
          alt="content"
          
        />
        <button
          onClick={toggleBookmark}
          className="absolute bottom-3 right-3 cursor-pointer"
        >
          <img
            src={
              isBookmarked
                ? "./images/isBookmarked.png"
                : "./images/Bookmark.png"
            }
            alt="Bookmark"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </button>
        {/* <MyInfoBookmark itemId={itemId} /> */}
      </div>
      <div className="flex flex-col items-center md:mb-4">
        <div className="text-2xl p-2 mx-1 break-all">{title}</div>
        <div className="flex">
          <div>수정</div>
          <div>삭제</div>
        </div>
      </div>
    </div>
  );
};

export default MyInfoContent;
