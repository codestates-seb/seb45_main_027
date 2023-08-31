import React from "react";

const UserProfileDetails = () => {
  return (
    <div className='flex flex-col justify-center'>
      <div>
        <img className="rounded-full object-cover w-[130px] h-[130px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px]" src="./images/Yebin.png" alt="" />
      </div>
      <div>
        <div className="text-2xl font-bold">닉네임</div>
        <button>수정버튼</button>
        <div>자기소개글</div>
      </div>
    </div>
  );
};

export default UserProfileDetails;
