import React from 'react';
import HeaderMobile from "../components/header/HeaderMobile";
import Background from "../components/common/Background";
import WriteBtn from '../components/write/WriteBtn';
import WriteAccordion from '../components/write/WriteAccordion';

const WriteShowRoom = () => { 
    return (
      <>
        <HeaderMobile buttonBgColor="bg-[#F5634A]" />
        <Background
          mainclassName=" bg-[#FFFAEE] w-full h-full px-56"
          divclassName="flex-col">
          <WriteBtn
            buttonBgColor="bg-[#F5634A]"
            buttonBorderColor="border-[#F5634A]"
            buttonTextColor="text-[#F5634A]"
            Title="Show room"
          />
          <WriteAccordion Title="Show room " />
        </Background>
      </>
    );
};

export default WriteShowRoom;