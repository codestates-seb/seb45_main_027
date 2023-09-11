// 헤더 모바일 버전 ( 글작성창에서만 )
import React from "react";
import { Link } from "react-router-dom";

const HeaderMobile = ({ buttonBgColor }) => {
  return (
    <div className="md:hidden w-full fixed z-50">
      <div className="p-7 shadow bg-white flex justify-center w-full h-full">
        <div className="flex justify-between items-center h-full w-full max-w-[1440px] ">
          <ul className="flex items-center justify-between w-full">
            {/* 홈 */}
            <Link to="/">
              <li>
                <img className="w-10" src="/images/Logo.png" alt="홈" />
              </li>
            </Link>

            <li>
              <span className="text-2xl font-semibold text-gray-800">
                글쓰기
              </span>
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
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
