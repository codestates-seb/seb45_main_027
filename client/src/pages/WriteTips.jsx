import React from 'react';
import HeaderMobile from "../components/header/HeaderMobile";
import Background from "../components/common/Background";
import WriteBtn from '../components/feed/write/WriteBtn';
import WriteAccordion from '../components/feed/write/WriteAccordion';
import WriteCoverImg from '../components/feed/write/WriteCoverImg';
import WriteEditor from '../components/feed/write/WriteEditor';

const WriteTips = () => {
  return (
    <>
      <HeaderMobile buttonBgColor="bg-[#00647B]" />
      <Background
        mainclassName="min-h-screen bg-[#FFFAEE] w-full h-full px-14 md:px-56 "
        divclassName="flex-col my-24 md:my-0">
        <div className="hidden md:block">
          <WriteBtn
            buttonBgColor="bg-[#00647B]"
            buttonBorderColor="border-[#00647B]"
            buttonTextColor="text-[#00647B]"
            Title="Tips"
          />
        </div>
        <WriteAccordion Title="Tips " />
        <WriteCoverImg bgColor="bg-[#00647b1c]" btnColor="bg-[#00647B]" />
        <WriteEditor />
      </Background>
    </>
  );
};

export default WriteTips;