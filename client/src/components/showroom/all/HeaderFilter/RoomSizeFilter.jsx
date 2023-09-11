import React from "react";

const RoomSizeFilter = ({ handleFilterClick }) => {
  const roomSize = [
    {
      name: "1~9평",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/SIZE01",
    },
    {
      name: "10평",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/SIZE02",
    },
    {
      name: "20평",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/SIZE03",
    },
    {
      name: "30평",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/SIZE04",
    },
    {
      name: "40평",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/SIZE05",
    },
    {
      name: "50평",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/SIZE06",
    },
    {
      name: "60평",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/SIZE07",
    },
    {
      name: "70평 이상",
      url: "https://1416-210-123-100-75.ngrok-free.app/feed/filter/SIZE00",
    },
  ];

  return (
    <div className="absolute grid grid-cols-4 gap-2 z-10  p-2 rounded-md ">
      {roomSize.map((room, index) => (
        <div
          key={index}
          className="bg-[#00647B] text-white text-[14px] py-2 px-2 rounded-md text-center w-[60px] h-[50px] flex items-center justify-center"
          onClick={() => handleFilterClick(room.url)}
        >
          {room.name}
        </div>
      ))}
    </div>
  );
};
export default RoomSizeFilter;
