import React from 'react';
import HeaderMobile from "../components/header/HeaderMobile";
import Background from "../components/common/Background";
import WriteBtn from '../components/write/WriteBtn';
import WriteAccordion from '../components/write/WriteAccordion';

const WriteTips = () => {
  return (
    <>
      <HeaderMobile buttonBgColor="bg-[#00647B]" />
      <Background
        mainclassName=" bg-[#FFFAEE] w-full h-full px-56"
        divclassName="flex-col">
        <WriteBtn
          buttonBgColor="bg-[#00647B]"
          buttonBorderColor="border-[#00647B]"
          buttonTextColor="text-[#00647B]"
          Title="Tips"
        />
        <WriteAccordion Title="Tips " />
      </Background>
    </>
  );
};

export default WriteTips;