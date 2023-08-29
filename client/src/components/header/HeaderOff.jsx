// 로그인 전 헤더 값

import React from "react";
import { Link } from "react-router-dom";

const HeaderOff = () => {
  return (
    <div className="flex">
      <ul className="flex text-[#F5634A] text-xl font-bold">
        {/* 로그인 */}
        <Link to="/login">
          <li className="flex items-center">
            <img className="flex pr-2.5 h-5" src="/images/vector.png" alt="" />
            <span className="pr-8">Login</span>
          </li>
        </Link>

        {/* 회원가입 */}
        <Link to="/signup">
          <li>
            <span>signup</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default HeaderOff;
