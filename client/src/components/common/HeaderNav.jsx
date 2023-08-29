import React from 'react';
import { Link } from "react-router-dom";

export const HeaderNav = () => {
    return (
      <div className="flex">
        <ul className="flex text-[#F5634A] text-xl font-bold">
          
          {/* 홈 */}
          <Link to="/">
            <li>
              <img
                className="w-8 h-8 mr-8"
                src="/images/삐삐Logo.png"
                alt="로고"
              />
            </li>
          </Link>

          {/* 쇼룸 */}
          <li><span>Show room</span></li>

          {/* 팁 */}
          <li className="px-8"><span>Tips</span></li>

          {/* 맵 */}
          <li><span>Map</span></li>
        </ul>
      </div>
    );
};

export default HeaderNav;