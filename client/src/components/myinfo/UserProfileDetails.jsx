import React from "react";

const UserProfileDetails = () => {
  return (
    <div className="flex flex-row md:flex-col md:mb-10 ">
      <div className='my-10'>
        <img
          className="rounded-full object-cover w-[130px] h-[130px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]"
          src="./images/Yebin.png"
          alt=""
        />
      </div>
      <div className='flex flex-col md:items-center'>
        <div className="text-2xl font-bold">닉네임</div>
        <div>자기소개글</div>
        <button>계정설정</button>
      </div>
    </div>
  );
};

export default UserProfileDetails;
