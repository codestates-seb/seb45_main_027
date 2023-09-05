import React, { useState, useEffect } from "react";
import Background from "../components/common/Background";
import TipsHeader from "../components/tips/TipsHeader";
import TipsContent from "../components/tips/TipsContent";
import FooterMobile from "../components/footer/FooterMobile";

const Tips = () => {
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
      <Background mainclassName="h-full bg-[#FFFAEE]" divclassName="">
        <div className="flex-col w-full">
          <TipsHeader viewportWidth={viewportWidth}></TipsHeader>
          <TipsContent viewportWidth={viewportWidth}></TipsContent>
        </div>
      </Background>
      {viewportWidth < 720 && <FooterMobile />}
    </>
  );
};

export default Tips;
