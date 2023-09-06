import React from 'react';

const button = "bg-white hover:bg-gray-100 py-2 px-4 shadow rounded";

const Edit = () => {
    return (
      <div className="flex justify-end w-full mt-5">
        <button className={button}>
          <span className="text-xl">수정하기</span>
        </button>
        <button className={`${button} ml-4`}>
          <span className="text-xl">삭제하기</span>
        </button>
      </div>
    );
};

export default Edit;