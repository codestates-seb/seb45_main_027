import React from "react";

const RoomTypeFilter = ({ handleFilterClick }) => {
  const roomType = [
    {
      name: "원룸&오피스텔",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/TYPE01",
    },
    {
      name: "아파트",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/TYPE02",
    },
    {
      name: "빌라&연립",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/TYPE03",
    },
    {
      name: "단독주택",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/TYPE04",
    },
    {
      name: "기타",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/TYPE00",
    },
  ];

  return (
    <div className="absolute grid grid-cols-3 gap-x-20 gap-y-2 z-10 p-2 rounded-md ">
      {roomType.map((room, index) => (
        <div
          key={index}
          className="bg-[#00647B] text-white text-[14px] py-2 px-2 rounded-md text-center w-[110px]  flex items-center justify-center"
          onClick={() => handleFilterClick(room.url)}
        >
          {room.name}
        </div>
      ))}
    </div>
  );
};

export default RoomTypeFilter;
