import React from "react";
import AllHeaderFilter from "./HeaderFilter/AllHeaderFilter";

const AllHeader = ({
  viewportWidth,
  setViewportWidth,
  handleFilterClick,
  setShowroomData,
  showroomData,
  inputValue,
  handleInputChange,
  handleSearch,
}) => {
  const isMobileView = viewportWidth < 720; // viewportWidth가 720보다 작으면 모바일 화면으로 간주
  return (
    <div className="flex justify-between items-center flex-wrap mx-8 mb-8">
      <div className="flex items-center sm:items-end">
        <h1 className="text-4xl text-[#F5634A] font-semibold Showcard-Gothic">
          All
        </h1>
        <AllHeaderFilter handleFilterClick={handleFilterClick} />
      </div>
      <div
        className={`relative flex items-center my-5 ${
          isMobileView ? "mx-auto pr-5" : ""
        }`}>
        <img
          className="absolute w-6 left-4"
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/Search_gray.png"
          alt="searchIamge"
        />
        <input
          className="w-[330px] py-3 pl-12 pr-4 rounded-md border"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={(e) => handleSearch(e, inputValue)}
        />
      </div>
    </div>
  );
};

export default AllHeader;
