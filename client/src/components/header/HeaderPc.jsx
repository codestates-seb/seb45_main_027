import React from "react";
import Background from "../common/Background";
import HeaderNav from "./HeaderNav"
import HeaderOff from "./HeaderOff";
// import HeaderOn from "./HeaderOn";

const HeaderPc = () => {
  return (
    <Background
      mainclassName="h-10 p-8 shadow"
      divclassName="justify-between items-center">
      <HeaderNav />
      <HeaderOff />
      {/* <HeaderOn /> */}
    </Background>
  );
};

export default HeaderPc;
