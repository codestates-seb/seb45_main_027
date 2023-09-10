import React from "react";
import { Link } from "react-router-dom";

const liPoint= "flex flex-col items-center w-12"


const FooterMobileWrite = () => {
  return (
    <footer>
      <div className="flex justify-center border py-4 fixed bottom-0 w-full bg-white">
        <ul className="flex items-center justify-around w-11/12 text-gray-400 font-medium">
          {/* 좋아요*/}
          <li className={liPoint}>
            <img
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/heart.png"
              alt="좋아요"
            />
            <span className="mt-2">00</span>
          </li>

          {/* 북마크 */}
          <li className={liPoint}>
            <img
              className="h-12"
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/bookmark.png"
              alt="북마크"
            />
            <span className="mt-2">000</span>
          </li>

          {/* 홈 */}
          <Link to="/">
            <li>
              <img className="w-14" src="/images/Logo.png" alt="홈" />
            </li>
          </Link>

          {/* 댓글 */}
          <li className={liPoint}>
            <img src="/images/speech-bubble.png" alt="댓글" />
            <span className="mt-2">0</span>
          </li>

          {/* 공유 */}
          <li className={liPoint}>
            <img src="/images/share.png" alt="공유" />
            <span className="mt-2">00</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default FooterMobileWrite;
