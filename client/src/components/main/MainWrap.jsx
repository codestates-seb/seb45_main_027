import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainWrap = ({ style, wrap, mainTitle, subTitle, intro1, intro2, intro3, paddingX, linkTo }) => {
  // intro 텍스트를 배열에 담습니다.
  const texts = [intro1, intro2, intro3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 텍스트 변경과 함께 애니메이션 효과 적용
    const timer = setInterval(() => {
      setCurrentIndex((index) => (index + 1) % texts.length);
    }, 5000); // 5초마다 텍스트 변경
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div
      className={`h-screen w-full flex justify-center md:justify-normal ${wrap}`}
      style={style}>
      <div className="p-8 flex flex-col justify-end md:justify-center w-max h-full">
        <div className="flex flex-col items-center bg-[#ffffffc2] w-full h-auto rounded-3xl shadow p-20">
          <span className="text-3xl font-semibold text-gray-700">
            {mainTitle}
          </span>
          <span className="Showcard-Gothic text-5xl font-semibold text-[#00647bbd] py-8">
            {subTitle}
          </span>
          <ul className="text-xl font-semibold text-gray-600 animate-slideOut">
            <li>{texts[currentIndex]}</li>
          </ul>
        </div>
        <Link to={linkTo}>
          <button
            className={`bg-[#ffffffc2] hover:bg-[#F5634A] text-[#00647bbd] hover:text-white w-full h-auto rounded-full shadow py-5 mt-12 mb-24 ${paddingX}`}>
            <span className="Showcard-Gothic text-3xl font-semibold px-2">
              Go! {subTitle}!
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainWrap;