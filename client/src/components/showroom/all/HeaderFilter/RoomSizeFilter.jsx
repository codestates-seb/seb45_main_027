import React from "react";

const RoomSizeFilter = () => {
  const roomSize = [
    "1~9평",
    "10평",
    "20평",
    "30평",
    "40평",
    "50평",
    "60평",
    "70평 이상",
  ];

  return (
    <div className="absolute grid grid-cols-4 gap-2 z-10  p-2 rounded-md ">
      {roomSize.map((room, index) => (
        <div
          key={index}
          className="bg-[#00647B] text-white text-[14px] py-2 px-2 rounded-md text-center w-[60px] h-[50px] flex items-center justify-center"
        >
          {room}
        </div>
      ))}
    </div>
  );
};
export default RoomSizeFilter;
