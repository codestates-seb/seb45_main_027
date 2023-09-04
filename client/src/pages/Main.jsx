import React, { useEffect, useState } from "react";
import MainFirst from "../components/main/MainFirst";
import MainSecond from "../components/main/MainSecond";
import MainThird from "../components/main/MainThird";
import MainSlogan from "../components/main/MainSlogan";

const Main = () => {
  // 스크롤 초기 값 0
  const [position, setPosition] = useState(0);

  function onScroll() {
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="w-full overscroll-x-none">
      {/* 메인1 */}
      <MainFirst />

      {/* 슬로건 */}
      <MainSlogan />

      {/* 메인2 */}
      <MainSecond />

      {/* 슬로건 */}
      <MainSlogan />

      {/* 메인3 */}
      <MainThird />
    </div>
  );
};

export default Main;
