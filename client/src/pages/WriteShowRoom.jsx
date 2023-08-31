import React from 'react';
import HeaderMobile from "../components/header/HeaderMobile";
import Background from "../components/common/Background";
import WriteBtn from '../components/feed/write/WriteBtn';
import WriteAccordion from '../components/feed/write/WriteAccordion';
import WriteCoverImg from '../components/feed/write/WriteCoverImg';

const WriteShowRoom = () => { 
    return (
      <>
        <HeaderMobile buttonBgColor="bg-[#F5634A]" />
        <Background
          mainclassName=" bg-[#FFFAEE] w-full h-full px-14 md:px-56"
          divclassName="flex-col my-24 md:my-0">
          <div className="hidden md:block">
            <WriteBtn
              buttonBgColor="bg-[#F5634A]"
              buttonBorderColor="border-[#F5634A]"
              buttonTextColor="text-[#F5634A]"
              Title="Show room"
            />
          </div>
          <WriteAccordion Title="Show room " />
          <WriteCoverImg bgColor="bg-[#f5644a16]" btnColor="bg-[#F5634A]" />
        </Background>
      </>
    );
};

export default WriteShowRoom;