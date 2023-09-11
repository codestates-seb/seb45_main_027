import React from "react";

const roomInfo = [
  "원룸",
  "거실",
  "침실",
  "주방",
  "욕실",
  "아이방",
  "드레스룸",
  "서재",
  "베란다",
  "현관",
  "기타",
];

const RoomInfoFilter = () => {
  return (
    <div className="absolute grid grid-cols-4 gap-2 z-10 p-2 rounded-md">
      {roomInfo.map((room, index) => (
        <div
          key={index}
          className="bg-[#00647B] text-white text-[14px] py-2 px-1 rounded-md  text-center "
        >
          {room}
        </div>
      ))}
    </div>
  );
};

export default RoomInfoFilter;
