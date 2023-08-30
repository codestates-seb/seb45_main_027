import React from "react";
import Background from "../common/Background";

const FooterPc = () => {
  return (
    <Background
      mainclassName="h-52 p-8 shadow bg-[#00647B] absolute bottom-0 w-full"
      divclassName="justify-center items-center">
      <div className="flex flex-col items-center">
        <img className="w-12 h-12" src="/images/삐삐Logo.png" alt="삐삐로고" />

        <span className="py-5 text-xl font-semibold text-white">
          © Copyright ⓒ 2023 삐삐
        </span>

        <ul className="flex text-xl font-semibold text-white">
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">
            <a
              href="https://github.com/YebinYun"
              target="_blank"
              rel="noreferrer">
              윤 예빈
            </a>
          </li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">
            <a
              href="https://github.com/greatjobcat"
              target="_blank"
              rel="noreferrer">
              이 원호
            </a>
          </li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">
            <a
              href="https://github.com/WONHO22"
              target="_blank"
              rel="noreferrer">
              최 유리
            </a>
          </li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">
            <a
              href="https://github.com/seonhoshin"
              target="_blank"
              rel="noreferrer">
              신 선호
            </a>
          </li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">
            <a href="https://github.com/2DNDN" target="_blank" rel="noreferrer">
              박 두산
            </a>
          </li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">
            <a
              href="https://github.com/Ernest45"
              target="_blank"
              rel="noreferrer">
              임 한준
            </a>
          </li>
          <li className="p-2 hover:bg-[#F5634A] rounded-2xl">
            <a
              href="https://github.com/PeterAhnn"
              target="_blank"
              rel="noreferrer">
              안 형섭
            </a>
          </li>
        </ul>
      </div>
    </Background>
  );
};

export default FooterPc;
