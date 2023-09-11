import React from "react";

const RoomTypeFilter = () => {
  const roomType = ["원룸&오피스텔", "아파트", "빌라&연립", "단독주택", "기타"];

  return (
    <div className="absolute grid grid-cols-3 gap-x-20 gap-y-2 z-10 bg-[#FFFAEE] p-2 rounded-md ">
      {roomType.map((room, index) => (
        <div
          key={index}
          className="bg-[#00647B] text-white text-[14px] py-2 px-2 rounded-md text-center w-[110px]  flex items-center justify-center"
        >
          {room}
        </div>
      ))}
    </div>
  );
};

export default RoomTypeFilter;
