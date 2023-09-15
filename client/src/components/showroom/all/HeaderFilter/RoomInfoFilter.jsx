import React from "react";

// 확장성고려해서 개선좀해라 카테고리
const roomInfo = [
  {
    name: "원룸",
    filterCode: "INFO01",
  },
  {
    name: "거실",
    filterCode: "INFO02",
  },
  {
    name: "침실",
    filterCode: "INFO03",
  },
  {
    name: "주방",
    filterCode: "INFO04",
  },
  {
    name: "욕실",
    filterCode: "INFO05",
  },
  {
    name: "아이방",
    filterCode: "INFO06",
  },
  {
    name: "드레스룸",
    filterCode: "INFO07",
  },
  {
    name: "서재",
    filterCode: "INFO08",
  },
  {
    name: "베란다",
    filterCode: "INFO09",
  },
  {
    name: "현관",
    filterCode: "INFO10",
  },
  {
    name: "기타",
    filterCode: "INFO00",
  },
];

const RoomInfoFilter = ({ handleFilterClick }) => {
  return (
    <div className="absolute top-20 sm:top-12 left-5 grid grid-cols-2 gap-1 z-10 sm:flex min-w-max py-2 text-gray-700 font-semibold bg-[#ffffff7a] rounded-md shadow">
      {roomInfo.map((room, index) => (
        <button
          key={index}
          className="flex justify-center hover:bg-[#00647bcc] hover:text-white min-w-max px-2.5 py-1 mx-1 rounded-md"
          onClick={() => handleFilterClick(room.filterCode)}
        >
          {room.name}
        </button>
      ))}
    </div>
  );
};

export default RoomInfoFilter;
