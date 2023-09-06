import React from 'react';

const Comment = () => {
    return (
      <div className='mt-10'>
        <div className="flex">
          <span className="text-xl font-semibold">댓글</span>
          <span className="text-xl font-semibold text-[#35C5F0] ml-2">0</span>
        </div>
        <div className="flex w-full mt-4">
          <img src="/images/userComment.png" alt="유저" />
          <div className="flex w-full relative">
            <input className="h-full w-full ml-6 border rounded-xl pl-5" />
            <button className=" absolute right-0 top-1/4 pr-5"> 입력 </button>
          </div>
        </div>
      </div>
    );
};

export default Comment;