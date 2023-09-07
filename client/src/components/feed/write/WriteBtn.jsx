import React, { useState, useEffect } from "react";

const btn = "rounded-md px-9 py-1 mx-2 shadow ";

const WriteBtn = ({
  buttonBgColor,
  buttonBorderColor,
  buttonTextColor,
  Title,
}) => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 반응형 조건부렌더링
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // 언마운트시 리스너제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex w-full justify-between pt-24 text-2xl">
      {viewportWidth <= 900 ? null : (
        <div className="flex">
          <div className={`${buttonBgColor} text-white ${btn}`}>주제</div>
          <div
            className={`${buttonBorderColor} ${buttonTextColor} border bg-white ${btn} pt-[1px]`}
          >
            {Title}
          </div>
        </div>
      )}
      <div
        className={`flex font-semibold ${
          viewportWidth <= 900 ? "justify-evenly w-full" : ""
        }`}
      >
        <button
          className={`${buttonBorderColor} ${buttonTextColor} border bg-white ${btn}`}
        >
          임시저장
        </button>
        <button className={`${buttonBgColor} text-white ${btn}`}>
          작성하기
        </button>
      </div>
    </div>
  );
};

export default WriteBtn;
