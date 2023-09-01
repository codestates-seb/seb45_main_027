import React, { useEffect, useState } from "react";
import Background from "../components/common/Background";
import MainFirst from "../components/main/MainFirst";
import MainSecond from "../components/main/MainSecond";
import MainThird from "../components/main/MainThird";

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
    <Background mainclassName="" divclassName="">
      <div className="w-full">
        {/* 메인1 */}
        <MainFirst/>

        {/* 메인2 */}
        <MainSecond/>

        {/* 메인3 */}
        <MainThird/>
      </div>
    </Background>
  );
};

export default Main;
