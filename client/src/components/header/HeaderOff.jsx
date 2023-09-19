import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderOff = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // 현재 경로를 로컬 스토리지에 저장
    if (window.location.pathname == "/signup") {
      localStorage.setItem("prevPath", "/");
    } else {
      localStorage.setItem("prevPath", window.location.pathname);
    }
    navigate("/login");
  };

  return (
    <div className="flex">
      <ul className="flex text-[#F5634A] text-xl font-bold">
        {/* 로그인 */}
        <li className="flex items-center" onClick={handleLoginClick}>
          <img
            className="flex pr-2.5 h-5"
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/vector.png"
            alt=""
          />
          <span className="Showcard-Gothic pr-8">Login</span>
        </li>

        {/* 회원가입 */}
        <Link to="/signup">
          <li>
            <span className="Showcard-Gothic">signup</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default HeaderOff;
