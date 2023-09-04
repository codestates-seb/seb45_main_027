// 로그인 후 헤더 값

import React from "react";
import { Link } from "react-router-dom";

const HeaderOn = () => {
    return (
      <div className="flex">
        <ul className="flex text-[#F5634A] text-xl font-bold">
          {/* 유저정보 */}
          <Link to="/myinfo">
            <li className="flex items-center">
              <div className="w-8 h-8 mr-2.5 bg-yellow-200" />
              <span className="pr-8 text-gray-700">닉네임</span>
            </li>
          </Link>

          {/* 로그아웃  */}
          <Link to="/signup">
            <li className="flex items-center">
              <img
                className="flex pr-2.5 h-5"
                src="/images/logout.png"
                alt=""
              />
              <span className="Showcard-Gothic">Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    );
};

export default HeaderOn;