// 헤더 모바일 버전 ( 글작성창에서만 )
import React from "react";
import Background from "../common/Background";
import { Link } from "react-router-dom";

const HeaderMobile = ({ buttonBgColor }) => {
  return (
    <div className="md:hidden">
      <Background
        mainclassName="h-10 p-8 shadow"
        divclassName="justify-between items-center">
        <ul className="flex items-center justify-between w-full">
          {/* 홈 */}
          <Link to="/">
            <li>
              <img className="w-10" src="/images/삐삐Logo.png" alt="홈" />
            </li>
          </Link>

          <li>
            <span className="text-2xl font-semibold text-gray-800">글쓰기</span>
          </li>

          {/* 작성버튼 */}
          <Link to="/Tips">
            <li>
              <button
                className={`text-xl font-semibold text-white rounded-xl py-1 px-4 ${buttonBgColor}`}>
                작성
              </button>
            </li>
          </Link>
        </ul>
      </Background>
    </div>
  );
};

export default HeaderMobile;
