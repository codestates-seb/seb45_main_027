import React, { useEffect } from "react";
import Background from "../components/common/Background";
import KakaoMap from "../components/map/KakaoMap";

const Map = () => {
  return (
    <Background
      mainclassName="h-full bg-[#FFFAEE] "
      divclassName="border-2 border-rose-500 "
    >
      <div className="p-5 flex-col w-full">
        <h1 className="text-4xl text-[#F5634A] py-5 font-bold">Map</h1>
        <KakaoMap></KakaoMap>
      </div>
    </Background>
  );
};

export default Map;
