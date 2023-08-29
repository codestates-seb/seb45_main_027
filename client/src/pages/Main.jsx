import React from "react";
import Background from "../components/common/Background";

const Main = () => {
  return (
    <Background
      mainclassName="h-10 p-8 border-b"
      divclassName="justify-between items-center"
    >
      <div className="">메인입니다.</div>
    </Background>
  );
};

export default Main;
