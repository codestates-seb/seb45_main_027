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
          <Link to="/showroom">
            <li>
              <span>Show room</span>
            </li>
          </Link>

          {/* 팁 */}
          <Link to="/tips">
            <li className="px-8">
              <span>Tips</span>
            </li>
          </Link>

          {/* 맵 */}
          <Link to="/map">
            <li>
              <span>Map</span>
            </li>
          </Link>
        </ul>
      </div>
    );
};

export default HeaderNav;