import React from "react";
import HeaderNav from "./HeaderNav";
import HeaderOff from "./HeaderOff";
import HeaderOn from "./HeaderOn";
import { useAuth } from "../../context/AuthContext"

const HeaderPc = () => {
  const { user } = useAuth();

  return (
    <div className="hidden md:block fixed w-full z-50">
      <div className="flex justify-center w-full h-full p-8 shadow bg-white">
        <div className="flex justify-between items-center h-full w-full max-w-[1440px]">
          <HeaderNav />

          {/* 로그인 전 */}
          {/* <HeaderOff /> */}

          {/* 로그인 후 */}
          {/* <HeaderOn /> */}
          {user ? <HeaderOn /> : <HeaderOff />}
        </div>
      </div>
    </div>
  );
};

export default HeaderPc;
