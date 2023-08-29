import React from "react";
import { backgrounMain } from "../common/Background";
import { backgrounWrap } from "../common/Background";
import {HeaderNav} from "../common/HeaderNav"

const HeaderPc = () => {
  return (
    <header className={`${backgrounMain} h-10 p-8 border-b`}>
      <div className={`${backgrounWrap} justify-between items-center`}>
        <div>{HeaderNav()}</div>
        <div>
          <ul className="flex text-[#F5634A] text-lg font-bold">
            <li className="flex items-center">
              <img
                className="flex pr-2.5 h-4"
                src="/images/vector.png"
                alt=""
              />
              <span className="pr-8">Login</span>
            </li>
            <li>
              <span>Signup</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderPc;
