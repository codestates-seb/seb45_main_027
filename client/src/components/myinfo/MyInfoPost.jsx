import React from "react";

const MyInfoPost = ({ imgSrc, title, itemId, deletePost }) => {
  const handleDeletePost = () => {
    deletePost(itemId);
  };

  return (
    <div className="m-4 h-full w-[140px] md:w-[180px] ">
      <div className="relative">
        <img
          className="rounded-lg object-cover w-[140px] h-[130px] md:w-[180px] md:h-[170px]"
          src={imgSrc}
          alt="content"
        />
      </div>
      <div className="flex flex-col items-center md:mb-4">
        <div className="text-2xl p-2 mx-1 break-all">{title}</div>
        <div className="flex flex-row text-[#57534e]">
          <button className='flex'>
            <img src="./images/edit.png" alt="edit" className="mx-1" />
            <div>수정</div>
          </button>
          <button onClick={handleDeletePost} className='flex'>
            <img src="./images/remove.png" alt="remove" className="ml-2 mr-1" />
            <div>삭제</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyInfoPost;
