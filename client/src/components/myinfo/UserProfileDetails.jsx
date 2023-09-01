import React from "react";
import { Link } from "react-router-dom";

const UserProfileDetails = () => {
  return (
    <div className="flex flex-row md:items-center md:flex-col md:mb-6 ">
      <div className="mt-10 mb-6">
        <img
          className="rounded-full object-cover w-[130px] h-[130px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]"
          src="./images/Yebin.png"
          alt=""
        />
      </div>
      <div className="flex flex-col md:items-center">
        <div className="text-2xl font-bold">닉네임</div>
        <div className="mx-16 my-4 break-all">
          자기소개글ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
        </div>
        <Link to="/account">
          <button className="bg-[#5AB0C3] text-white font-bold hover:bg-[#5AB0C3]/50 rounded-full p-2 mt-4">
            계정설정
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfileDetails;
