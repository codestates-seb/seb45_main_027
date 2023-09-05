import React, { useState } from "react";

const button = "flex items-center justify-center h-full";

const UserBottom = () => {

    const [follow, setFollow] = useState(false);

    return (
      <div className="flex justify-between py-12 border-b">
        <div className="flex items-center">
          <div className="border w-16 h-16 rounded-full bg-red-500 mr-4" />
          <div>
            <div className="flex items-center">
              <div className="text-xl font-semibold">유저이름</div>
              <div className="flex items-center pr-2 pl-2.5 text-2xl">·</div>
              <button className="" onClick={() => setFollow(!follow)}>
                {follow ? (
                  <div className={button}>
                    <span className="text-xl hover:text-gray-300 text-gray-600 font-semibold pl-1">
                      팔로잉
                    </span>
                  </div>
                ) : (
                  <div className={button}>
                    <span className="text-xl hover:text-[#96dbf0] text-[#35c5f0] font-semibold pl-1">
                      팔로우
                    </span>
                  </div>
                )}
              </button>
            </div>
            <div className="text-xl text-gray-500">유저소개 유저소개 유저소개 유저소개 유저소개 유저소개 </div>
          </div>
        </div>
      </div>
    );
};

export default UserBottom;