import React from "react";
import Background from "../components/common/Background";
import BestInterior from "../components/showroom/BestInterior";
import All from "../components/showroom/All";

const ShowRoom = () => {
  return (
    <Background mainclassName="h-full h-screen bg-[#FFFAEE]">
      <div className="flex-col  w-full">
        <BestInterior />
        <All />
      </div>
    </Background>
  );
};

export default ShowRoom;
