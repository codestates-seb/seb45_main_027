import React from "react";
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
    <div className="flex justify-center ml-5 mr-5 ">
      <div className="relative mr-10">
        <img
          className="absolute w-[28px] top-[13px] left-4"
          src="./images/Search_gray.png"
          alt="searchIamge"
        />
        <input
          className="w-[300px] mt-3 py-3 pl-14 pr-4 rounded-3xl border border-[#BBBBBB] text-[14px]"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleSearch}
          placeholder="#잼"
        />
      </div>
      <button className="bg-[#00647B] h-[36px] mt-4 px-4 pb-2 pt-1 text-2xl text-white rounded-3xl font-semibold">
        Post
      </button>
    </div>
  );

  return (
    <div className="flex-col">
      <div className="flex pt-10 justify-between">
        <h1 className="pt-1 pl-8 text-5xl text-[#F5634A] font-semibold">
          Interior Tips
        </h1>
        {viewportWidth >= 690 ? SearchAndPostButton : null}
      </div>
      <div className="flex-col">
        <h2 className="text-[#786F6F] pl-8">
          search keywords to improve your home
        </h2>
        {viewportWidth < 690 ? SearchAndPostButton : null}
      </div>
    </div>
  );
};

export default TipsHeader;
