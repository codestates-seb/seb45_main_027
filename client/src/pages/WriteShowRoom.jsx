import React from "react";
import HeaderMobile from "../components/header/HeaderMobile";
import Background from "../components/common/Background";
import WriteBtn from "../components/feed/write/WriteBtn";
import WriteGuide from "../components/feed/write/WriteGuide";
import WriteCoverImg from "../components/feed/write/WriteCoverImg";
import WriteTitle from "../components/feed/write/WriteTitle";
import WriteInput from "../components/feed/write/WriteInput";
import WriteFormShowroom from "../components/feed/write/WriteFormShowroom";
import WriteFormShowroomcopy from "../components/feed/write/WriteFormShowroomcopy";

const WriteShowRoom = () => {
  return (
    <>
      <HeaderMobile buttonBgColor="bg-[#F5634A]" />
      <Background
        mainclassName=" bg-[#FFFAEE] w-full h-full px-14 md:px-56"
        divclassName="flex-col my-24 md:my-0"
      >
        <div className="hidden md:block">
          <WriteBtn
            buttonBgColor="bg-[#F5634A]"
            buttonBorderColor="border-[#F5634A]"
            buttonTextColor="text-[#F5634A]"
            Title="Show room"
          />
        </div>
        <WriteGuide Title="Show room " />
        <WriteInput />
        <WriteCoverImg bgColor="bg-[#f5644a16]" btnColor="bg-[#F5634A]" />
        <div className="mt-10 mb-20 p-4 bg-white w-full h-full">
          <WriteTitle />
          {/* <WriteFormShowroom /> */}
          <WriteFormShowroomcopy />
        </div>
      </Background>
    </>
  );
};

export default WriteShowRoom;
