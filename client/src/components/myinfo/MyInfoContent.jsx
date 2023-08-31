import React from "react";

const MyInfoContent = ({ imgSrc, title }) => {
  return (
    <div className="mb-[5%] mr-[2.5%] h-full w-[140px] md:w-[180px] ">
      <div className="flex">
        <img
          className="rounded-lg object-cover w-[140px] h-[130px] md:w-[180px] md:h-[170px]"
          src={imgSrc}
          alt="content"
        />
        {/* <button>bookmark</button> */}
      </div>
      <div className='flex flex-col items-center'>
      <div className='text-2xl p-2 mx-1 break-all'>{title}</div>
      <div className='flex'>
        <div>수정</div>
        <div>삭제</div>
      </div>
      </div>
    </div>
  );
};

export default MyInfoContent;
