import React from "react";
import Background from "../common/Background";

const FooterPc = () => {
  return (
    <Background
      mainclassName="absolute h-52 p-8 shadow bottom-0 bg-[#00647B]"
      divclassName="justify-center items-center">
      <div className="flex flex-col items-center">
        <img className="w-12 h-12" src="/images/삐삐Logo.png" alt="삐삐로고" />
        <span className="py-5 text-xl font-semibold text-white">
          © Copyright ⓒ 2023 삐삐
        </span>
        <ul className="flex text-xl font-semibold text-white">
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">윤예빈</li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">최유리</li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">이원호</li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">신선호</li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">박두산</li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">임한준</li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">안형섭</li>
        </ul>
      </div>
    </Background>
  );
};

export default FooterPc;
