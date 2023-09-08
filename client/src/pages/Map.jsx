import React, { useState, useEffect } from "react";
import Background from "../components/common/Background";
import KakaoMap from "../components/map/KakaoMap";
import FooterMobile from "../components/footer/FooterMobile";

const Map = () => {
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
    <>
      <Background mainclassName="h-full bg-[#FFFAEE] ">
        <div className="flex flex-col w-full md:mt-10 md:mx-8">
          {viewportWidth < 720 ? null : (
            <h1 className="text-3xl md:text-4xl text-[#F5634A] font-semibold Showcard-Gothic w-max">
              Map
            </h1>
          )}
          <div className="py-5">
            <KakaoMap viewportWidth={viewportWidth}></KakaoMap>
          </div>
        </div>
      </Background>
      {viewportWidth < 720 && <FooterMobile />}
    </>
  );
};

export default Map;
