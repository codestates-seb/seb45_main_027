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
    <div className="h-screen w-full" style={style}>
      <div className={`flex flex-col justify-center w-max h-full ${wrap}`}>
        <div className="flex flex-col bg-[#ffffffc2] w-full h-auto rounded-3xl shadow p-20">
          <span className="text-3xl font-semibold text-gray-800">
            {mainTitle}
          </span>
          <span className="text-3xl font-semibold text-gray-800 py-8">
            {subTitle}
          </span>
          <ul className="text-xl font-semibold text-gray-600 animate-slideOut">
            <li>{texts[currentIndex]}</li>
          </ul>
        </div>
        <Link to={linkTo}>
          <button
            className={`bg-[#ffffffc2] hover:bg-[#F5634A] text-gray-800 hover:text-white w-full h-auto rounded-full shadow py-5 ${paddingX} mt-12`}>
            <span className="text-3xl font-semibold  px-2">{subTitle} 바로가기</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MainWrap;