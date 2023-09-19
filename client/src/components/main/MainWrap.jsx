import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainWrap = ({ style, pageImg, wrap, mainTitle, subTitle, intro1, intro2, intro3, paddingX, linkTo }) => {
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
    <>
      <div
        className="h-screen w-full sm:w-max flex justify-center md:justify-normal mx-5"
        style={style}>
        <div className="pb-16 flex flex-col items-center justify-end md:justify-center w-full h-full">
          <div>
            <img
              className="w-20 mb-12 animate__animated animate__wobble animate__infinite animate__slow"
              src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/logo.png"
              alt=""
            />
          </div>
          <div className="flex flex-col items-center bg-[#ffffffc2] w-full h-auto rounded-xl shadow p-20">
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
          <Link to={linkTo} className="w-full">
            <button
              className={`bg-[#ffffffc2] hover:bg-[#F5634A] text-[#00647bbd] hover:text-white w-full h-auto rounded-xl shadow py-5 mt-12 mb-24 ${paddingX}`}>
              <span className="Showcard-Gothic text-3xl font-semibold px-2">
                Go! {subTitle}!
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="hidden sm:flex mb-16 animate__animated animate__zoomInRight animate__slow">
        <img className="h-[650px]" src={pageImg} alt="바로가기" />
      </div>
    </>
  );
};

export default MainWrap;