// 로그인 후 헤더 값
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const HeaderOn = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");
  const nickname = localStorage.getItem("nickname");
  const profileImg = localStorage.getItem("profileImg");

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {}
  };

  const handleUserClick = () => {
    navigate(`/myinfo/${memberId}`);
  };

  return (
    <div className="flex">
      <ul className="flex text-[#F5634A] text-xl font-bold">
        {/* 유저정보 */}
        <li
          className="flex items-center cursor-pointer"
          onClick={handleUserClick}>
          {profileImg === 'null'  ? (
            <div className="w-8 h-8 mr-2.5 bg-yellow-200 rounded-full"></div>
          ) : (

            <img
              src={profileImg}
              alt="profileImg"
              className='w-8 h-8 mr-2.5 rounded-full object-cover'
            />
          )}
          <span className="pr-8 text-gray-700">{nickname}</span>
        </li>

        {/* 로그아웃  */}
        <li className="flex items-center cursor-pointer" onClick={handleLogout}>
          <img
            className="flex pr-2.5 h-5"
            src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/logout.png"
            alt=""
          />
          <span className="Showcard-Gothic">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default HeaderOn;
