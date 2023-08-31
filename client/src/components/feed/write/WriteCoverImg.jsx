import React from 'react';

const WriteCoverImg = ({bgColor, btnColor}) => {
    return (
      <div className="w-full h-full flex mt-10 ">
        <div
          className={`${bgColor} w-full h-[500px] flex flex-col justify-center items-center text-xl rounded-2xl shadow`}>
          <span className="font-semibold text-gray-500 mb-10">
            추가하기 버튼으로 커버사진을 업로드 해주세요.
          </span>
          <button
            className={`${btnColor} text-white px-10 py-2 rounded-3xl shadow`}>
            커버사진 추가하기
          </button>
        </div>
      </div>
    );
};

export default WriteCoverImg;