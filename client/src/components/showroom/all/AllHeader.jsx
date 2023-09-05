import React from "react";
import useInput from "../../../hooks/useInput";

const AllHeader = ({ viewportWidth, setViewportWidth }) => {
  const [inputValue, handleInputChange, clearInput] = useInput("");

  const handleSearch = (e) => {
    // 추후 앤터 누를시 서버와 통신해서 해당 게시물을 보여주는 로직 작성 ****
    if (e.key === "Enter") {
      clearInput();
    }
  };

  const isMobileView = viewportWidth < 720; // viewportWidth가 720보다 작으면 모바일 화면으로 간주
  return (
    <div className="flex justify-between flex-wrap">
      <div className="flex items-center">
        <h1 className="pt-1 text-4xl text-[#F5634A] font-semibold">All</h1>
        <div className="pl-4 pt-6 text-xl  flex-nowrap">
          <span className="pr-3 text-[16px]">최신순</span>
          <span className="pr-3 text-[16px]">인기순</span>
          <span className="pr-3 text-[16px]">공간별</span>
          <span className="pr-3 text-[16px]">평수별</span>
          <span className="pr-3 text-[16px]">주거형태별</span>
        </div>
      </div>
      <div className={`relative ${isMobileView ? "mx-auto pr-5" : ""}`}>
        <img
          className="absolute w-[28px] top-[13px] left-4"
          src="./images/Search_gray.png"
          alt="searchIamge"
        />
        <input
          className="w-[330px] mt-3 mr-3 py-3 pl-14 pr-4 rounded-3xl border border-[#BBBBBB]"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
        />
      </div>
    </div>
  );
};

export default AllHeader;
