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
    <div className="absolute grid grid-cols-4 gap-2 z-10 p-2 rounded-md">
      {roomInfo.map((room, index) => (
        <div
          key={index}
          className="bg-[#00647B] text-white text-[14px] py-2 px-1 rounded-md text-center cursor-pointer"
          onClick={() => handleFilterClick(room.filterCode)}
        >
          {room.name}
        </div>
      ))}
    </div>
  );
};

export default RoomInfoFilter;
