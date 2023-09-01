import React from 'react';
import { Link } from "react-router-dom";

const MainWrap = ({ style, mainTitle, subTitle, intro1, intro2, intro3, page, px, linkTo }) => {
  return (
    <div className="h-screen w-full" style={style}>
      <div className="flex flex-col bg-[#ffffffc2] w-max h-auto rounded-3xl shadow p-20">
        <span className="text-3xl font-semibold text-gray-800">
          {mainTitle}
        </span>
        <span className="text-3xl font-semibold text-gray-800 py-8">
          {subTitle}
        </span>
        <ul className=" text-lg font-semibold text-gray-600">
          <li>{intro1}</li>
          <li>{intro2}</li>
          <li>{intro3}</li>
        </ul>
      </div>

      <Link to={linkTo}>
        <button
          className={`bg-[#ffffffc2] w-max h-auto rounded-full shadow py-5 ${px} mt-12`}>
          <span className="text-3xl font-semibold text-gray-800 px-2">
            {page}
          </span>
        </button>
      </Link>
    </div>
  );
};

export default MainWrap;