import React from "react";

const UserInfoFollowList = () => {
  return (
    <div className="">
      <div className="flex flex-row md:justify-center mb-10">
        <div className='flex'>
          <button className="mx-1">Following</button>
          <div>1</div>
        </div>
        <div className='flex'>
          <button className="ml-4 mr-1">Followers</button>
          <div>1</div>
        </div>
      </div>
      <div className="flex justify-between mx-3">
        <div className="flex">
          <img className="h-12 rounded-full" src="./images/Hanjun.png" alt="" />
          <button className="mx-2.5 font-md truncate overflow-hidden max-w-[85px]">
            Nick
            namefffffffffffffffffffffffvvvvvvvvvvvvvvvfffffffffffffffffffffffffffffffffffffffff
          </button>
        </div>
        <button className="text-xs text-white font-bold">
          <span className="bg-[#5AB0C3] rounded-full p-1.5">Following</span>
        </button>
      </div>
    </div>
  );
};

export default UserInfoFollowList;
