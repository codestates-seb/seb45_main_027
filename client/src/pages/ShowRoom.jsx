import React, { useState, useEffect } from "react";
import Background from "../components/common/Background";
import BestInterior from "../components/showroom/bestinterior/BestInterior";
import All from "../components/showroom/all/All";

const ShowRoom = () => {
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
    <Background mainclassName="h-full bg-[#FFFAEE]">
      <div className="flex-col w-full">
        <BestInterior
          viewportWidth={viewportWidth}
          setViewportWidth={setViewportWidth}
        />
        <All
          viewportWidth={viewportWidth}
          setViewportWidth={setViewportWidth}
        />
      </div>
    </Background>
  );
};

export default ShowRoom;
