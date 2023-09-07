import React from "react";
import { Link } from "react-router-dom";
import useInput from "../../hooks/useInput";

const TipsHeader = ({ viewportWidth }) => {
  const [inputValue, handleInputChange, clearInput] = useInput("");

  const handleSearch = (e) => {
    // 추후 앤터 누를시 서버와 통신해서 해당 게시물을 보여주는 로직 작성 ****
    if (e.key === "Enter") {
      clearInput();
    }
  };

  const SearchAndPostButton = (
    <button className="flex justify-center items-center">
      <div className="relative flex items-center mx-5">
        <img
          className="absolute w-6 left-4"
          src="./images/Search_gray.png"
          alt="searchIamge"
        />
        <input
          className="w-[300px] py-3 pl-14 pr-4 rounded-md border text-[14px]"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          placeholder="#Tag"
        />
      </div>
      <Link to="/tips/write">
        <button className="bg-[#00647B] hover:bg-[#00647bb4] shadow py-2 px-6 text-2xl font-semibold text-white rounded-md">
          Post
        </button>
      </Link>
    </button>
  );

  return (
    <div className="flex-col mx-8">
      <div className="flex pt-10 justify-between items-center">
        <h1 className="text-4xl text-[#F5634A] font-semibold Showcard-Gothic">
          Interior Tips
        </h1>
        {viewportWidth >= 690 ? SearchAndPostButton : null}
      </div>
      <div className="flex-col">
        <h2 className="text-gray-500 font-medium text-lg">
          search keywords to improve your home
        </h2>
        {viewportWidth < 690 ? SearchAndPostButton : null}
      </div>
    </div>
  );
};

export default TipsHeader;
