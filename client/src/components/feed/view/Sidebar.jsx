import React, { useState } from "react";

const display =
  "flex justify-center items-center w-20 h-20 bg-white border rounded-full shadow my-8 ";

const Sidebar = () => {
    const [like, setLike] = useState(false);
    const [Bookmark, setBookmark] = useState(false);
  
    return (
      <div className="hidden md:flex flex-col w-max h-0 sticky top-48 float-right mr-20 z-50">
        {/* 좋아요 */}
        <button className={display} onClick={() => setLike(!like)}>
          <img
            className="m-4"
            src={like ? "/images/heart-on.png" : "/images/heart-off.png"}
            alt="좋아요"
          />
        </button>

        {/* 북마크 */}
        <button className={display} onClick={() => setBookmark(!Bookmark)}>
          <img
            className="m-4"
            src={
              Bookmark ? "/images/bookmark-on.png" : "/images/bookmark-off.png"
            }
            alt="북마크"
          />
        </button>

        {/* 댓글 */}
        <button className={display}>
          <img
            className="m-5"
            src="/images/side-speech-bubble.png"
            alt="댓글"
          />
        </button>

        {/* 공유 */}
        <button className={`${display} pr-2.5`}>
          <img className="m-4" src="/images/side-share.png" alt="공유" />
        </button>
      </div>
    );
};

export default Sidebar;
