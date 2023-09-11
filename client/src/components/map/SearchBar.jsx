import React from "react";

const SearchBar = ({
  returnToCurrentLocation,
  onSearch,
  inputText,
  setInputText,
  viewportWidth,
}) => {
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(e.target.value);
      e.preventDefault();
    }
  };
  return (
    <form
      className={`flex ${
        viewportWidth < 720
          ? "mb-4"
          : "absolute z-10 top-5 left-1/2 transform -translate-x-1/2"
      }`}>
      <div className="flex justify-start bg-white p-2 w-full h-1/8 text-center mr-4 shadow-xl rounded-lg">
        <img
          className="w-[30px] p-[1px]"
          src="./images/Search.png"
          alt="searchimg"
        />
        <input
          className="bg-transparent w-80 focus:outline-none pl-4 text-[14px]"
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          value={inputText}
          placeholder="검색어를 입력하세요"
        />
      </div>
      <button
        className="shadow-xl rounded-lg bg-white w-[50px] p-p-[1px]"
        onClick={returnToCurrentLocation}>
        <img
          className="w-full p-2"
          src="https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/CurrentLocation.png"
          alt="CurrentLocation"
        />
      </button>
    </form>
  );
};

export default SearchBar;
