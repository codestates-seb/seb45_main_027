import React from "react";
import { Link } from "react-router-dom";

const TipsHeader = ({ inputValue, handleInputChange, handleSearch }) => {
  return (
    <div className="flex flex-col items-start mt-10 mx-8">
      {/* 카테고리 문구 */}
      <div className="flex justify-between w-full">
        <div className="flex items-baseline w-max ">
          <h1 className="text-3xl md:text-4xl text-[#F5634A] font-semibold Showcard-Gothic w-max">
            Interior Tips
          </h1>
          <h2 className="hidden md:block text-gray-500 font-medium text-lg pl-4  w-max">
            당신의 삶을 바꿔드립니다. 지금 바로 태그검색!
          </h2>
        </div>

        <div className="flex flex-col items-end w-full">
          {/* 작성 버튼 */}
          <Link to="/tips/write">
            <button className="bg-[#00647B] hover:bg-[#00647bb4] shadow py-2 px-6 text-2xl font-semibold text-white rounded-md">
              Post
            </button>
          </Link>
        </div>
      </div>

      {/* 입력창 */}
      <div className="relative flex items-center justify-end mt-5">
        <img
          className="absolute left-5 w-6"
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/Search_gray.png"
          alt="searchIamge"
        />
        <input
          className="py-3 pl-14 pr-4 rounded-md border text-[14px] md:items-end items-center"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={(e) => handleSearch(e, inputValue)}
          placeholder="#Tag"
        />
      </div>
    </div>
  );
};

export default TipsHeader;
